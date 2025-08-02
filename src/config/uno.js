import sonataPreset from 'unocss-preset-sonatacss';
import { defineConfig, definePreset } from 'unocss';
import { merge } from '../utils/merge.js';

const DEFAULT_CONTENT_PATH = '**/*.{html,blade.php,js,ts,jsx,tsx,vue,svelte,astro}';

/**
 * Create a new preset in Uno's configuration with all user's rules registered
 * in `sonataConfig.uno.rules`. User rules can return an array or a function.
 * Functions are injected with the registered design tokens.
 *
 * @param {Object} sonataConfig
 */
function injectUserRules(sonataConfig) {
    const userPresets = sonataConfig.uno.configOrPath?.presets ?? [];
    sonataConfig.uno.configOrPath ??= {};

    const rules = sonataConfig.uno.rules.map(
        rule => Array.isArray(rule) ? rule : rule(sonataConfig.tokens)
    ).flat();

    const preset = definePreset(() => ({ rules }));
    userPresets.push(preset());
    sonataConfig.uno.configOrPath.presets = userPresets;

    delete sonataConfig.uno.rules;
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
    if (Array.isArray(sonataConfig.uno?.rules)) {
        injectUserRules(sonataConfig);
    }

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
