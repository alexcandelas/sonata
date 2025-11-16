import browserslist from 'browserslist';
import defaultConfig from './config/defaultConfig.js';
import fs from 'fs';
import path from 'path';
import { buildDesignTokens } from './utils/buildDesignTokens.js';
import { isEmptyObject } from './utils/isEmptyObject.js';
import { isObject } from './utils/isObject.js';
import { singleMerge } from './utils/merge.js';

async function resolveUserConfig(config) {
    if (isObject(config) && ! isEmptyObject(config)) {
        return { config, path: null };
    }

    let defaultPath = path.resolve('./sonata.config.js');
    let customPath = typeof config === 'string' ? path.resolve(config) : null;
    let customPathExists = customPath && fs.existsSync(customPath);
    let resolvedPath;

    if (customPath && ! customPathExists) {
        console.warn(`Warning: Sonata configuration file not found at ${customPath}.`);
    }

    if (customPath && customPathExists) {
        resolvedPath = customPath;
    } else if (fs.existsSync(defaultPath)) {
        resolvedPath = defaultPath;
    }

    if (! resolvedPath) {
        console.warn('Warning: No Sonata configuration file found. Using default configuration.');

        return { config: {}, path: null };
    }

    if (process.env.NODE_ENV === 'development') {
        const timestampedPath = `${resolvedPath}?t=${Date.now()}`;

        return {
            config: (await import(timestampedPath)).default,
            path: resolvedPath,
        };
    }

    return {
        config: (await import(resolvedPath)).default,
        path: resolvedPath,
    };
}

function mergeConfig(target, source) {
    if (source?.REPLACE === true) {
        return source;
    }

    return singleMerge(target, source, mergeConfig);
}

function resolveBrowsersTarget(userConfig) {
    if (userConfig.target) return userConfig.target;

    const loadedBrowserslistConfig = browserslist.loadConfig({ path: process.cwd() });

    if (loadedBrowserslistConfig && loadedBrowserslistConfig.length) {
        return browserslist();
    }
}

/**
 * Recursively remove null entries and 'REPLACE' keys from an object.
 */
function cleanConfig(object) {
    if (! isObject(object)) {
        throw new Error('Parameter should be a plain object.');
    }

    let result = {};

    Object.keys(object).forEach((key) => {
        if (isObject(object[key])) {
            result[key] = cleanConfig(object[key]);
        } else if (key !== 'REPLACE' && object[key] !== null) {
            result[key] = object[key];
        }
    });

    return result;
}

/**
 * Flatten tokens that are nested two levels deep or more.
 *
 * @example
 * // Before:
 * {
 *     colors: {
 *         blue: {
 *             50: #008ae8
 *         }
 *     }
 * }
 * // After:
 * {
 *     colors: {
 *         'blue-50': #008ae8
 *     }
 * }
 */
function flattenDeeplyNestedTokens(tokens) {
    for (const key in tokens) {
        if (isObject(tokens[key])) {
            tokens[key] = buildDesignTokens(tokens[key], true);
        }
    }
}

/**
 * Transform all font-size, letter-spacing, and line-height
 * token values defined in pixels into rem units.
 *
 * @param {Object} config
 */
function transformFontPxToRem(config) {
    const regex = /^(\d+(\.\d+)?)px$/;

    ['fontSize', 'letterSpacing', 'lineHeight'].forEach(property => {
        for (const key in config.tokens[property]) {
            const match = config.tokens[property][key].match(regex);

            if (match) {
                config.tokens[property][key] = (match[1] / 16).toString() + 'rem';
            }
        }
    });
}

export function resolveCallbacks(value, config = null) {
    config = config || value;
    let resolved = typeof value === 'function' ? value(config.tokens) : value;

    if (isObject(resolved)) {
        for (const key in resolved) {
            resolved[key] = resolveCallbacks(resolved[key], config);
        }
    }

    return resolved;
}

export async function resolveConfig(config) {
    const { config: userConfig, path: configPath } = await resolveUserConfig(config);
    let mergedConfig = mergeConfig(Object.assign({}, defaultConfig), userConfig);
    mergedConfig.target = resolveBrowsersTarget(userConfig) ?? mergedConfig.target;
    mergedConfig = resolveCallbacks(cleanConfig(mergedConfig));
    flattenDeeplyNestedTokens(mergedConfig.tokens);

    if (mergedConfig.enabledVisitors?.fontPxToRem !== false) {
        transformFontPxToRem(mergedConfig);
    }

    return {
        sonataResolvedConfig: mergedConfig,
        configPath,
    };
}
