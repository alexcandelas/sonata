import { isObject } from "./isObject.js";

/**
 * Performs a deep merge of `source` into `target`.
 * Mutates `target` only but not its objects and arrays.
 *
 * @author [Steven Enten](https://gist.github.com/ahtcx/0cd94e62691f539160b32ecda18af3d6?permalink_comment_id=2930530#gistcomment-2930530)
 * @author inspired by [jhildenbiddle](https://stackoverflow.com/a/48218209).
 * @param {Object} target
 * @param {Object} source
 * @param {Function} recursiveCallback
 * @returns {Object}
 */
export function singleMerge(target, source, recursiveCallback = merge) {
    if (! isObject(source)) {
        return target;
    }

    Object.keys(source).forEach(key => {
        const targetValue = target[key];
        const sourceValue = source[key];

        if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
            target[key] = targetValue.concat(sourceValue);
        } else if (isObject(targetValue) && isObject(sourceValue)) {
            target[key] = recursiveCallback(Object.assign({}, targetValue), sourceValue);
        } else {
            target[key] = sourceValue;
        }
    });

    return target;
}

/**
 * Deep merge multiple `sources` into `target`.
 *
 * @param {Object} target
 * @param {Object} sources
 * @returns {Object}
 */
export function merge(target, ...sources) {
    sources.reduce((t, s) => singleMerge(t, s), target);

    return target;
}
