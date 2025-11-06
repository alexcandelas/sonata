import lengthUnits from '../../config/lengthUnits.js';

function isFraction(s) {
    return (/^\d+\/\d+$/).test(s);
}

/**
 * @param {string} [negative]
 * @param {string} size
 * @param {string} [unit]
 * @param {boolean} [unitlessToRems]
 * @returns {string|void}
 */
export function resolveNumericValue(negative = '', size, unit, unitlessToRems = true) {
    if (unit && ! lengthUnits.includes(unit)) return;

    if (isFraction(size)) {
        return `calc(${size} * ${negative}100%)`;
    }

    if (! size || size === '0' || size === 'auto') {
        return size;
    }

    if (isNaN(Number(size))) return;

    size = unitlessToRems && ! unit ? Number(size) / 4 : size;
    unit ||= unitlessToRems ? 'rem' : '';

    return `${negative}${size}${unit}`;
}
