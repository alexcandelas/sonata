import { flattenObject } from './flattenObject.js';
import { isObject } from './isObject.js';
import { kebabCase } from './kebabCase.js';

const kebabCaseExceptions = {
    breakpoints: 'breakpoint',
    colors: 'color',
};

let generatedTokens = {};

/**
 * Recursively flatten the given tokens object and append
 * the results in the generated tokens.
 *
 * @param {string} key
 * @param {Object} object
 */
function flattenAndAppendTokens(key, object) {
    if (! isObject(object)) return object;

    for (const i in object) {
        if (isObject(object[i])) {
            const tempObject = flattenObject(object[i], '-');

            for (const j in tempObject) {
                generatedTokens[key + '-' + i + '-' + j] = tempObject[j].toString();
            }
        } else {
            if (i === 'DEFAULT') {
                generatedTokens[key] = object[i].toString();
            } else {
                generatedTokens[key + '-' + i] = object[i].toString();
            }
        }
    }
}

/**
 * Build a flattened object of tokens with their respective value.
 *
 * @param {Object} tokenMap
 * @param {Boolean} isNestedToken
 * @returns {Object}
 */
export function buildDesignTokens(tokenMap, isNestedToken = false) {
    generatedTokens = {};

    for (const key in tokenMap) {
        let propertyKey = key;

        if (! isNestedToken) {
            propertyKey = Object.hasOwn(kebabCaseExceptions, key)
                ? kebabCaseExceptions[key]
                : kebabCase(key, false);
        }

        if (typeof tokenMap[key] === 'string' || typeof tokenMap[key] === 'number') {
            generatedTokens[propertyKey] = tokenMap[key].toString();
        } else {
            flattenAndAppendTokens(propertyKey, tokenMap[key]);
        }
    }

    return generatedTokens;
}
