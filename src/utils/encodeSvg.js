/**
 * Encode characters in svg code for inline use.
 *
 * @author [postcss-inline-svg](https://github.com/TrySound/postcss-inline-svg).
 * @param {string} svg
 * @returns {string}
 */
export default function encodeSvg(svg) {
    return svg
        .replace(/%/g, '%25')
        .replace(/</g, '%3C')
        .replace(/>/g, '%3E')
        .replace(/&/g, '%26')
        .replace(/#/g, "%23")
        .replace(/{/g, "%7B")
        .replace(/}/g, "%7D")
        .replace(/'/g, "\"");
}
