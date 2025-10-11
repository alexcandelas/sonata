import UnoCSS from '@unocss/postcss';
import bootSonata from './src/visitors/bootSonata.js';
import browserslistToEsbuild from 'browserslist-to-esbuild';
import colorFallbackFunction from './src/visitors/colorFallbackFunction.js';
import concatenateNestedClasses from './src/visitors/concatenateNestedClasses.js';
import copyRule from './src/visitors/copyRule.js';
import emMediaQueries from './src/visitors/emMediaQueries.js';
import fontPxToRem from './src/visitors/fontPxToRem.js';
import generateCustomProperties from './src/visitors/generateCustomProperties.js';
import inlineSvgFunction from './src/visitors/inlineSvgFunction.js';
import responsiveRule from './src/visitors/responsiveRule.js';
import screenRule from './src/visitors/screenRule.js';
import tokenFunction from './src/visitors/tokenFunction.js';
import unoConfig from './src/config/uno.js';
import { Features, transform as lightningTransform } from 'lightningcss';
import { buildMediaQueriesMap } from './src/utils/buildMediaQueriesMap.js';
import { buildTokens } from './src/utils/buildTokens.js';
import { merge } from './src/utils/merge.js';
import { preprocessCSS } from 'vite';
import { resolveConfig } from './src/resolveConfig.js';

let userConfig, sonataResolvedConfig, tokens, mediaQueriesMap;

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
    'sonata-custom-properties': {},
    responsive: {
        body: 'rule-list'
    },
    unocss: {
        prelude: '*'
    },
};

const visitors = [
    (src, id) => [
        [generateCustomProperties, tokens],
        [tokenFunction, tokens],
        [colorFallbackFunction, tokens],
        [copyRule, src, id, customAtRules],
    ],

    (src, id) => [
        [screenRule, sonataResolvedConfig.tokens.breakpoints],
        [responsiveRule, mediaQueriesMap],
        [inlineSvgFunction, id],
        [fontPxToRem],
        [concatenateNestedClasses],
    ],

    () => [
        [emMediaQueries],
    ]
];

let disabledVisitors;

function getEnabledVisitor([visitor, ...params]) {
    disabledVisitors ??= Object.entries(sonataResolvedConfig.visitors)
        .map(v => v[1] === false ? v[0] : null)
        .filter(Boolean);

    if (! disabledVisitors.includes(visitor.name)) {
        return visitor(...params);
    }
}

function getExtension(filename) {
    const matches = filename.toLowerCase().match(/\.([a-z|A-Z]+)(?:\?\w+)?$/);

    return matches ? matches[1] : null;
}

export default async function sonatacss(_userConfig = {}) {
    let viteResolvedConfig;
    userConfig = _userConfig;
    sonataResolvedConfig = await resolveConfig(_userConfig);
    tokens = buildTokens(sonataResolvedConfig.tokens);
    mediaQueriesMap = buildMediaQueriesMap(sonataResolvedConfig.tokens.breakpoints);

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
                    transformer: 'postcss',
                    lightningcss: {
                        customAtRules,
                    },
                    postcss: {
                        plugins: [
                            UnoCSS(unoConfig(sonataResolvedConfig))
                        ],
                    },
                }
            }),
            transform: function (src, id) {
                if (getExtension(id) !== 'css') return;

                return lightningTransform({
                    filename: id,
                    customAtRules,
                    code: Buffer.from(src),
                    visitor: bootSonata(sonataResolvedConfig),
                }).code.toString();
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
                        visitor: merge(...enabledVisitors),
                        exclude: Features.DirSelector | Features.LightDark | Features.FontFamilySystemUi,
                        nonStandard: {
                            deepSelectorCombinator: true,
                        },
                    }).code.toString(),
                };
            },
        })),
        // Lightning CSS transformer for build command
        {
            enforce: 'post',
            apply: 'build',
            configResolved(config) {
                viteResolvedConfig = config;
            },
            async transform(src, id) {
                if (getExtension(id) !== 'css') return;

                viteResolvedConfig.css.transformer = 'lightningcss';

                return {
                    code: (await preprocessCSS(src, id, viteResolvedConfig)).code,
                };
            }
        },
    ];
}
