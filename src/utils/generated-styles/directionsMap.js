/**
 * Return a directional map for utilities.
 *
 * @param {string?} prefix
 * @param {string?} suffix
 * @returns {{t: string[], r: string[], b: string[], l: string[], x: string[], y: string[]}}
 */
export function directionsMap(prefix = '', suffix = '') {
    prefix = prefix ? prefix + '-' : '';
    suffix = suffix ? '-' + suffix : '';

    return {
        t: [`${prefix}top${suffix}`],
        r: [`${prefix}right${suffix}`],
        b: [`${prefix}bottom${suffix}`],
        l: [`${prefix}left${suffix}`],
        x: [`${prefix}inline${suffix}`],
        y: [`${prefix}block${suffix}`],
    };
};
