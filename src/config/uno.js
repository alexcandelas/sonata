import UnoPreset from '../UnoPreset.js';
import { defineConfig, definePreset } from 'unocss';
import { merge } from '../utils/merge.js';

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
    sonataConfig.uno ??= {};

    const newPreset = definePreset(() => ({
        rules: resolveRulesOrVariants(sonataConfig.uno.rules, sonataConfig.tokens),
        variants: resolveRulesOrVariants(sonataConfig.uno.variants, sonataConfig.tokens),
    }));

    const userPresets = sonataConfig.uno.presets ?? [];
    userPresets.push(newPreset());
    sonataConfig.uno.presets = userPresets;

    delete sonataConfig.uno.rules;
    delete sonataConfig.uno.variants;
}

export default function (sonataConfig, safelist = []) {
    injectUserRulesAndVariants(sonataConfig);

    return defineConfig(merge(
        {
            enforce: 'post',
            safelist,
            outputToCssLayers: {
                cssLayerName: (layer) => layer === 'default' ? 'utilities' : layer,
            },
            presets: [
                UnoPreset(sonataConfig.tokens, sonataConfig.ignore),
            ],
        },
        sonataConfig.uno,
    ))
};
