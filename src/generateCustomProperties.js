/**
 * Generate CSS variables from the design tokens.
 *
 * @param {Object} tokens
 * @returns {string}
 */
export default function generateCustomProperties(tokens) {
    const css = Object.entries(tokens)
        .map(([property, value]) => `--${property}: ${value};`)
        .join('');

    return `@layer base { :root { ${css} } }`;
}
