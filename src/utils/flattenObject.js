import isObject from './isObject.js';

/**
 * Recursively flatten the given object.
 *
 * @param {Object} object
 * @param {string} separator
 * @returns {Object}
 */
export default function flattenObject(object, separator = '-') {
    if (! isObject(object)) return object;

    let result = {};

    for (const i in object) {
        if (isObject(object[i])) {
            const tempObject = flattenObject(object[i], separator);

            for (const j in tempObject) {
                result[i + separator + j] = tempObject[j];
            }
        } else {
            result[i] = object[i];
        }
    }

    return result;
}
