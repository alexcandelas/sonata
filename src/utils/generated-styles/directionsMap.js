/**
 * Return a directional map for utilities.
 *
 * @param {string?} prefix
 * @param {string?} suffix
 * @param {Boolean?} includeLogicalProperties
 * @returns {Object}
 */
export function directionsMap(prefix = '', suffix = '', includeLogicalProperties = false) {
    prefix = prefix ? prefix + '-' : '';
    suffix = suffix ? '-' + suffix : '';

    const directions = {
        t: [`${prefix}top${suffix}`],
        r: [`${prefix}right${suffix}`],
        b: [`${prefix}bottom${suffix}`],
        l: [`${prefix}left${suffix}`],
        x: [`${prefix}inline${suffix}`],
        y: [`${prefix}block${suffix}`],
    };

    if (includeLogicalProperties) {
        directions.bs = [`${prefix}block-start${suffix}`];
        directions.be = [`${prefix}block-end${suffix}`];
        directions.is = [`${prefix}inline-start${suffix}`];
        directions.ie = [`${prefix}inline-end${suffix}`];
    }

    return directions;
}
