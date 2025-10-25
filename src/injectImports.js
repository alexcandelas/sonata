import layers from "./config/layers.js";

/**
 * Return the CSS string with the filtered imports.
 *
 * @param {Array} ignoreList
 * @returns {string}
 */
function buildCSS(ignoreList = []) {
    let result = '@import "sonatacss/generated-styles.css";\n';

    for (const layer in layers) {
        if (ignoreList.includes(layer + '.*')) continue;

        layers[layer].forEach(file => {
            if (ignoreList.includes(`${layer}.${file}`)) return;

            result += `@import "sonatacss/${layer}/${file}.css" layer(${layer});\n`;
        })
    }

    return result;
}

/**
 * Inject the filtered imports and return the CSS string.
 *
 * @param {string} src
 * @param {Array} ignoreList
 * @returns {string}
 */
export default function injectImports(src, ignoreList = []) {
    if (! Array.isArray(ignoreList)) {
        throw new Error('Sonata CSS: Invalid configuration. The `ignore` value must be an array.');
    }

    const imports = buildCSS(ignoreList);

    return src.replace(/@import ["']sonatacss["'][\s;]/g, imports);
}
