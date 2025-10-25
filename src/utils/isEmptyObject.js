import { isObject } from "./isObject.js";

/**
 * Check if the given object is an empty JS plain object.
 *
 * @param {*} object
 * @returns {boolean}
 */
export function isEmptyObject(object) {
    if (! isObject(object)) {
        return false;
    }

    for (const prop in object) {
        if (object.hasOwnProperty(prop)) {
            return false;
        }
    }

    return true;
}
