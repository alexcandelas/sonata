import identsToString from '../utils/identsToString.js';
import { merge } from '../utils/merge.js';
import { transform } from 'lightningcss';

let expectedClassNames, foundStyles;

/**
 * Return a list of classNames from the given `@copy` rule prelude.
 *
 * @param {Object} rulePrelude
 * @returns {Array}
 */
function extractClassNames(rulePrelude) {
    return identsToString(rulePrelude) // Restore rule prelude to a string
        .split(',')
        .map(className => className.trim())
        .filter(className => className); // Remove empty entries
}

/**
 * Register all CSS classes that will be needed for `@copy` rules.
 */
function registerRequiredClasses(src, id, customAtRules) {
    transform({
        filename: id,
        minify: false,
        customAtRules,
        code: Buffer.from(src),
        visitor: {
            Rule: {
                custom: {
                    copy(rule) {
                        extractClassNames(rule.prelude.value)
                            .forEach(className => expectedClassNames.add(className));
                    }
                }
            }
        }
    });
}

/**
 * Store the block content for each of the needed CSS classes.
 *
 * @param {Object} styles
 */
function searchClasses(styles) {
    for (let selector of styles.selectors) {
        selector = identsToString(selector);

        if (expectedClassNames.has(selector)) {
            const storedDeclarations = foundStyles.get(selector);

            foundStyles.set(
                selector,
                merge({}, storedDeclarations || {}, styles.declarations)
            );
        }
    }
}

/**
 * Search for classes inside a @responsive rule.
 *
 * @param {Object} rule
 */
function searchInsideResponsiveRule(rule) {
    if (rule.type !== 'custom' || rule.value.name !== 'responsive') return;

    rule.value.body.value.forEach(styles => {
        if (styles.type === 'style') {
            searchClasses(styles.value);
        }
    });
}

/**
 * Search for the requested classes in the source code.
 */
function storeContent(src, id, customAtRules) {
    transform({
        filename: id,
        minify: false,
        customAtRules,
        code: Buffer.from(src),
        visitor: {
            StyleSheet(stylesheet) {
                stylesheet.rules.forEach(rule => {
                    // Search for classes at root level
                    if (rule.type === 'style') {
                        searchClasses(rule.value);
                    }

                    searchInsideResponsiveRule(rule);

                    // Search for classes inside @layer blocks
                    if (rule.type === 'layer-block') {
                        rule.value.rules.forEach(ruleInsideLayer => {
                            if (ruleInsideLayer.type === 'style') {
                                searchClasses(ruleInsideLayer.value);
                            }

                            searchInsideResponsiveRule(ruleInsideLayer);
                        })
                    }
                });
            }
        }
    });
}

/**
 * Copy the block content of the requested classes from the `@copy` rule.
 *
 * @returns {Object}
 */
export default function copyRule(src, id, customAtRules) {
    expectedClassNames = new Set();
    foundStyles = new Map();

    registerRequiredClasses(src, id, customAtRules);

    if (! expectedClassNames.size) return;

    storeContent(src, id, customAtRules);

    return {
        Rule: {
            style(rule) {
                rule.value.rules = rule.value.rules.map(child => {
                    if (child.value.name !== 'copy') return child;

                    let declarationsToCopy = {
                        declarations: [],
                        importantDeclarations: [],
                    };

                    extractClassNames(child.value.prelude.value)
                        .forEach(className => {
                            if (foundStyles.has(className)) {
                                const found = foundStyles.get(className);

                                declarationsToCopy.declarations.push(...found.declarations);
                                declarationsToCopy.importantDeclarations.push(...found.importantDeclarations);
                            }
                        });

                    rule.value.declarations.declarations.unshift(...declarationsToCopy.declarations);
                    rule.value.declarations.importantDeclarations.unshift(...declarationsToCopy.importantDeclarations);

                    return {
                        type: 'ignored',
                        value: null
                    };
                });

                return rule;
            }
        }
    };
}
