import unaccent from './unaccent.js';

/**
 * Turns a string into kebab-case format, removing accents/diacritics.
 *
 * @param {string} str
 * @param {boolean} separateDigitsFromLetters
 * @returns {string}
 *
 * @example
 * kebabCase('São Paulo') // returns 'sao-paulo'
 * kebabCase('AdminUser123') // returns 'admin-user-123'
 * kebabCase('_FooBar_') // returns 'foo-bar'
 */
export default function kebabCase(str, separateDigitsFromLetters = true) {
    let result = unaccent(str)
        // Replace non-alphanumeric characters with hyphens
        .replace(/[^A-Za-z0-9]+/g, '-')
        // Prefix consecutive or individual uppercase letters with a hyphen and lowercase them
        .replace(/[A-Z]+(?![a-z])|[A-Z]/g, match => '-' + match.toLowerCase())
        // Replace multiple hyphens with a single hyphen
        .replace(/-+/g, '-')
        // Remove leading and trailing hyphens
        .replace(/^-|-$/g, '');

    if (separateDigitsFromLetters) {
        return result.replace(/(\d)([a-z])|([a-z])(\d)/g, (_, d1, l2, l1, d2) => `${d1||l1}-${l2||d2}`)
    }

    return result;
}
