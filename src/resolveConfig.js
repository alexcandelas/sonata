import browserslist from 'browserslist';
import buildTokens from './utils/buildTokens.js';
import defaultConfig from './config/defaultConfig.js';
import fs from 'fs';
import isEmptyObject from './utils/isEmptyObject.js';
import isObject from './utils/isObject.js';
import path from 'path';
import { singleMerge } from './utils/merge.js';

async function resolveUserConfig(config) {
    if (isObject(config) && ! isEmptyObject(config)) {
        return config;
    }

    if (typeof config === 'string') {
        let configFromPath;

        try {
            configFromPath = require(path.resolve(config));
        } catch (e) {
            throw new Error(e);
        }

        return configFromPath;
    }

    let projectConfig = path.resolve('./sonata.config.js');

    if (fs.existsSync(projectConfig)) {
        return (await import(projectConfig)).default;
    }

    return {};
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
            tokens[key] = buildTokens(tokens[key]);
        }
    }
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
    const userConfig = await resolveUserConfig(config);
    let mergedConfig = mergeConfig(Object.assign({}, defaultConfig), userConfig);
    mergedConfig.target = resolveBrowsersTarget(userConfig) ?? mergedConfig.target;
    mergedConfig = resolveCallbacks(cleanConfig(mergedConfig));
    flattenDeeplyNestedTokens(mergedConfig.tokens);

    return mergedConfig;
}
