/**
 * Generate CSS variables from the design tokens.
 *
 * @param {Object} tokens
 * @returns {Object}
 */
export default function generateCustomProperties(tokens) {
    const declarations = Object.entries(tokens).map(([key, value]) =>
        ({
            property: '--' + key,
            raw: value
        })
    );

    return {
        Rule: {
            custom: {
                'sonata-custom-properties': function (rule) {
                    return {
                        type: 'style',
                        value: {
                            selectors: [[{ type: 'pseudo-class', kind: 'root' }]],
                            declarations: { declarations },
                            loc: rule.loc
                        }
                    };
                }
            }
        }
    };
}
