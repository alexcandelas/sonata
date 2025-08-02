/**
 * Update each selector to include the query prefix.
 *
 * @param {Array} rules
 * @param {string} mediaQueryPrefix
 * @returns {Array}
 */
function prepareRules(rules, mediaQueryPrefix) {
    return rules.map(item => {
        const styles = Object.assign({}, item, {
            value: Object.assign({}, item.value)
        });

        styles.value.selectors = styles.value.selectors.map(selectors =>
            selectors.map(selector => {
                if (selector.type !== 'class') return selector;

                return {
                    type: selector.type,
                    name: mediaQueryPrefix + ':' + selector.name,
                };
            })
        );

        return styles;
    });
}

/**
 * Generate the given rules for every breakpoint registered.
 *
 * @param {Object} mediaQueriesMap
 * @returns {Object}
 */
export default function responsiveRule(mediaQueriesMap) {
    return {
        Rule: {
            custom: {
                responsive(rule) {
                    // Include the rules without an at-rule
                    let result = [...rule.body.value];

                    mediaQueriesMap.forEach((mediaQuery) => {
                        const rules = prepareRules(rule.body.value, mediaQuery.prefix);

                        result.push({
                            type: 'media',
                            value: {
                                rules,
                                loc: rule.loc,
                                query: {
                                    mediaQueries: [
                                        { raw: mediaQuery.query }
                                    ]
                                }
                            }
                        });
                    })

                    return result;
                }
            }
        }
    };
}
