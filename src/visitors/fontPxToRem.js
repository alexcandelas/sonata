/**
 * Transform the px value to a rem value in the given property if applicable.
 *
 * @param {Object} property
 * @returns {Object}
 */
function replacePxWithRem(property) {
    if (property.value.type !== 'length') return property;

    const size = property.value.value.value;

    if (size.unit === 'px') {
        property.value.value.value = {
            unit: 'rem',
            value: size.value / 16
        }
    }

    return property;
}

/**
 * Replace all px values with rem values in font declarations.
 * Similar to https://github.com/cuth/postcss-pxtorem
 */
export default function fontPxToRem() {
    return {
        Declaration: {
            'font'(property) {
                property.value.value.map(v => {
                    if (v.type === 'length' && v.value.unit === 'px') {
                        v.value = {
                            unit: 'rem',
                            value: v.value.value / 16
                        };
                    }

                    return v;
                });

                return property;
            },

            'font-size'(property) {
                return replacePxWithRem(property);
            },

            'letter-spacing'(property) {
                return replacePxWithRem(property);
            },

            'line-height'(property) {
                return replacePxWithRem(property);
            },

            'word-spacing'(property) {
                return replacePxWithRem(property);
            },
        }
    };
}
