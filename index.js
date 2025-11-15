import browserslistToEsbuild from 'browserslist-to-esbuild';
import colorFallbackFunction from './src/visitors/colorFallbackFunction.js';
import concatenateNestedClasses from './src/visitors/concatenateNestedClasses.js';
import copyRule from './src/visitors/copyRule.js';
import emMediaQueries from './src/visitors/emMediaQueries.js';
import extractCopiedSelectors from './src/utils/extractCopiedSelectors.js';
import fontPxToRem from './src/visitors/fontPxToRem.js';
import generateCustomProperties from './src/generateCustomProperties.js';
import injectImports from './src/injectImports.js';
import inlineSvgFunction from './src/visitors/inlineSvgFunction.js';
import path from 'node:path';
import responsiveRule from './src/visitors/responsiveRule.js';
import screenRule from './src/visitors/screenRule.js';
import tokenFunction from './src/visitors/tokenFunction.js';
import { ClassExtractor } from './src/ClassExtractor.js';
import { composeVisitors, Features, transform as lightningTransform } from 'lightningcss';
import { buildDesignTokens } from './src/utils/buildDesignTokens.js';
import { buildMediaQueriesMap } from './src/utils/buildMediaQueriesMap.js';
import { resolveConfig } from './src/resolveConfig.js';

let copiedSelectors, disabledVisitors, mediaQueriesMap, sonataResolvedConfig, configPath, tokens;

const customAtRules = {
    apply: {
        prelude: '*',
    },
    copy: {
        prelude: '*',
    },
    screen: {
        prelude: '*',
        body: 'style-block'
    },
    responsive: {
        body: 'rule-list'
    },
    'sonata-custom-properties': {},
    'sonata-generated': {
        prelude: '*',
    },
};

const visitors = [
    (src, id) => [
        [tokenFunction, tokens],
        [colorFallbackFunction, tokens],
        [copyRule, src, id, customAtRules, copiedSelectors],
        [screenRule, sonataResolvedConfig.tokens.breakpoints],
    ],
    (src, id) => [
        [responsiveRule, mediaQueriesMap],
        [inlineSvgFunction, id],
        [fontPxToRem],
        [concatenateNestedClasses],
    ],
    () => [
        [emMediaQueries],
    ],
];

function getEnabledVisitor([visitor, ...params]) {
    if (! disabledVisitors.includes(visitor.name)) {
        return visitor(...params);
    }
}

function getExtension(filename) {
    const matches = filename.toLowerCase().match(/\.([a-z|A-Z]+)(?:\?\w+)?$/);

    return matches ? matches[1] : null;
}

function updateCssModules(cssInputs, server) {
    cssInputs.forEach(cssInput => {
        const mods = server.moduleGraph.getModulesByFile(cssInput.absolutePath);

        if (! mods?.size) return;

        for (const mod of mods) {
            server.moduleGraph.invalidateModule(mod)
        }

        server.ws.send({
            type: 'update',
            updates: [
                {
                    type: 'css-update',
                    path: cssInput.path,
                    timestamp: Date.now(),
                },
            ],
        });
    });
}

async function loadConfig(userConfig) {
    ({ sonataResolvedConfig, configPath } = await resolveConfig(userConfig));
    tokens = buildDesignTokens(sonataResolvedConfig.tokens);
    mediaQueriesMap = buildMediaQueriesMap(sonataResolvedConfig.tokens.breakpoints);
    disabledVisitors = Object.entries(sonataResolvedConfig.visitors)
        .map(v => v[1] === false ? v[0] : null)
        .filter(Boolean);
}

export default async function sonatacss(userConfig = {}) {
    let cssInputs, extractor, generatedCSS;

    await loadConfig(userConfig);

    return [
        // Boot framework
        {
            enforce: 'pre',
            config: () => ({
                build: {
                    cssMinify: 'lightningcss',
                    cssTarget: browserslistToEsbuild(sonataResolvedConfig.target)
                },
                css: {
                    lightningcss: {
                        customAtRules,
                    },
                }
            }),
            configResolved(config) {
                const input = config.build.rollupOptions.input;

                cssInputs = (Array.isArray(input) ? input : [input])
                    .filter(i => i.endsWith('.css'))
                    .map(i => ({
                        path: i,
                        absolutePath: path.resolve(i),
                    }));
            },
            async handleHotUpdate({ file, server }) {
                if (file === configPath) {
                    await loadConfig(userConfig);
                    updateCssModules(cssInputs, server);
                }

                if (! extractor || ! extractor.matchesContentPatterns(file)) return;

                await extractor.watchFile(file);

                updateCssModules(cssInputs, server);
            },
            transform: async function (src, id) {
                if (getExtension(id) !== 'css') return;

                // Inject all Sonata @imports
                return injectImports(src, sonataResolvedConfig.ignore);
            }
        },
        {
            transform: async function (src, id) {
                if (getExtension(id) !== 'css') return;

                // Store all selectors needed for @copy rules
                copiedSelectors = extractCopiedSelectors(src);

                // Inject custom properties and dynamically generated styles
                const customProperties = generateCustomProperties(tokens);
                extractor ??= await ClassExtractor(sonataResolvedConfig);
                extractor.setCopiedSelectors(copiedSelectors);
                generatedCSS = await extractor.generateCSS();

                // Replace copied selectors with the new set including
                // selectors extracted from generated @copy rules
                copiedSelectors = extractor.getCopiedSelectors();

                return src.replace(/@sonatacss-generated-styles[\s;]/, `${customProperties} ${generatedCSS}\n`);
            }
        },
        // Run visitors
        visitors.map(batch => ({
            transform(src, id) {
                if (getExtension(id) !== 'css') return;

                const enabledVisitors = batch(src, id).map(getEnabledVisitor).filter(Boolean);

                if (! enabledVisitors.length) return;

                return {
                    code: lightningTransform({
                        filename: id,
                        customAtRules,
                        code: Buffer.from(src),
                        visitor: composeVisitors(enabledVisitors),
                        exclude: Features.DirSelector | Features.LightDark | Features.FontFamilySystemUi,
                        nonStandard: {
                            deepSelectorCombinator: true,
                        },
                    }).code.toString(),
                };
            },
        })),
    ];
}
