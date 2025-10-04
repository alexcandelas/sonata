/**
 * Removes accents/diacritics from a Unicode string.
 *
 * @param {string} str
 * @returns {string}
 */
export default function unaccent(str) {
    return str.normalize('NFD').replace(/\p{Diacritic}/gu, '');
}
