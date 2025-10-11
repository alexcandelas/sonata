import sonataPreset from 'unocss-preset-sonatacss';
import { defineConfig, definePreset } from 'unocss';
import { merge } from '../utils/merge.js';

const DEFAULT_CONTENT_PATH = '**/*.{html,js,ts,jsx,tsx,astro,blade.php,svelte,vue}';

/**
 * Normalize the registered rules or variants. Rules or variants registered
 * as functions are executed with the provided design tokens.
 *
 * @param {Array} rulesOrVariants
 * @param {Object} tokens
 * @returns {Array}
 */
function resolveRulesOrVariants(rulesOrVariants, tokens) {
    if (! Array.isArray(rulesOrVariants) || ! rulesOrVariants.length) {
        return [];
    }

    return rulesOrVariants.map(
        item => Array.isArray(item) ? item : item(tokens)
    ).flat();
}

/**
 * Create a new preset in Uno's configuration with the rules and variants
 * registered by the user in `sonataConfig.uno.rules`. Both rules and
 * variants can return an array or a function.
 *
 * @param {Object} sonataConfig
 */
function injectUserRulesAndVariants(sonataConfig) {
    sonataConfig.uno.configOrPath ??= {};

    const newPreset = definePreset(() => ({
        rules: resolveRulesOrVariants(sonataConfig.uno.rules, sonataConfig.tokens),
        variants: resolveRulesOrVariants(sonataConfig.uno.variants, sonataConfig.tokens),
    }));

    const userPresets = sonataConfig.uno.configOrPath.presets ?? [];
    userPresets.push(newPreset());
    sonataConfig.uno.configOrPath.presets = userPresets;

    delete sonataConfig.uno.rules;
    delete sonataConfig.uno.variants;
}

/**
 * Return the content paths that UnoCSS will scan for utility classes.
 * If no paths are registered by the user, it falls back to a
 * default path. The `vendor` directory is always ignored.
 *
 * @param {array|string} registeredPaths
 * @returns {array}
 */
function resolveContentPaths(registeredPaths) {
    let paths;

    if (Array.isArray(registeredPaths) && registeredPaths.length) {
        paths = registeredPaths;
    } else if (typeof registeredPaths === 'string' && registeredPaths.trim()) {
        paths = [registeredPaths.trim()];
    } else {
        paths = [DEFAULT_CONTENT_PATH];
    }

    return [
        ...paths,
        '!vendor/**',
    ];
}

export default function (sonataConfig) {
    injectUserRulesAndVariants(sonataConfig);

    return defineConfig(merge(
        {
            directiveMap: {
                screen: false,
                theme: false,
            },
            configOrPath: {
                content: {
                    filesystem: resolveContentPaths(sonataConfig.content),
                },
                outputToCssLayers: {
                    cssLayerName: (layer) => layer === 'default' ? 'utilities' : layer
                },
                presets: [
                    sonataPreset(sonataConfig.tokens, sonataConfig.ignore),
                ],
            }
        },
        sonataConfig.uno,
    ))
};
