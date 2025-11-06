import { resolveNumericValue } from './resolveNumericValue.js';
import { isObject } from 'unocss';

/**
 * @param {string} token
 * @param {string} cssVariable
 * @param {array} validTokens
 * @param {string} [negative]
 * @returns {string|void}
 */
function resolveTokenValue(token, cssVariable, validTokens, negative = '') {
    if (! token && validTokens.includes('DEFAULT')) {
        return negative ? `calc(var(--${cssVariable}) * -1)` : `var(--${cssVariable})`;
    }

    if (token && validTokens.includes(token)) {
        return negative ? `calc(var(--${cssVariable}-${token}) * -1)` : `var(--${cssVariable}-${token})`;
    }
}

/**
 * @param {string} property
 * @param {Object} options
 * @param {string} [options.cssVariable]
 * @param {Object} [options.tokens]
 * @param {Object} [options.propsByDirection]
 * @param {string} [options.forcedValue]
 * @param {boolean} [options.resolveNumeric]
 * @returns {function}
 */
export function directionalDeclaration(property, {
    cssVariable,
    tokens = {},
    propsByDirection = {},
    forcedValue,
    resolveNumeric = true
}) {
    return ([_, negative = '', direction, size = '', unit = '']) => {
        const token = size + unit;
        cssVariable ??= property;

        let value = forcedValue ?? resolveTokenValue(token, cssVariable, Object.keys(tokens), negative);

        if (value === undefined && resolveNumeric) {
            value = resolveNumericValue(negative, size, unit);
        }

        if (value === undefined) return;

        if (! direction) {
            return { [property]: value };
        }

        return Object.fromEntries(
            propsByDirection[direction].map(prop => [prop, value])
        );
    };
}

/**
 * @param {string} property
 * @param {Object} [options]
 * @param {boolean} [options.unitlessToRems]
 * @returns {function}
 */
export function numericDeclaration(property, options = {}) {
    return ([_, negative, size, unit]) => {
        const value = resolveNumericValue(negative, size, unit, options.unitlessToRems);

        if (value !== undefined) {
            return { [property]: value };
        }
    };
}

/**
 * @param {string} property
 * @param {Object} options
 * @param {string} [options.cssVariable]
 * @param {Object} [options.tokens]
 * @param {Object} [options.propsByDirection]
 * @param {string} [options.forcedValue]
 * @param {boolean} [options.resolveNumeric]
 * @returns {function}
 */
export function tokenDeclaration(property, options) {
    options.resolveNumeric = false;

    if (isObject(options.propsByDirection)) {
        return ([_, direction, token]) => directionalDeclaration(property, options)([undefined, '', direction, token]);
    }

    return ([_, token]) => directionalDeclaration(property, options)([undefined, '', '', token]);
}
