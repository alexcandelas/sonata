/**
 * Check if the given object is a JS plain object.
 */
export function isObject(object) {
    return object != null
        && Object.prototype.toString.call(object) === '[object Object]'
        && object.constructor.prototype.hasOwnProperty('isPrototypeOf');
}
