import layers from "../config/layers.js";

/**
 * Return the list of files to be imported.
 *
 * @param {Array} ignoreList
 * @returns {Array}
 */
function buildImportList(ignoreList = []) {
    if (! Array.isArray(ignoreList)) {
        throw new Error('Sonata CSS: Invalid configuration. The `ignore` value must be an array.');
    }

    const filteredLayers = [];

    for (const layer in layers) {
        if (ignoreList.includes(layer + '.*')) continue;

        layers[layer].forEach(file => {
            if (ignoreList.includes(`${layer}.${file}`)) return;

            filteredLayers.push({ layer, file });
        })
    }

    return filteredLayers;
}

export default function (config) {
    const imports = buildImportList(config.ignore);

    return {
        Rule: {
            import(rule) {
                if (rule.value.url !== 'sonatacss') {
                    return rule;
                }

                return imports.map(({ file, layer }) => ({
                    type: 'import',
                    value: {
                        url: `sonatacss/${layer}/${file}.css`,
                        loc: rule.value.loc,
                        layer: file.startsWith('uno-') ? null : [ layer ],
                    },
                }));
            },
        }
    };
}
