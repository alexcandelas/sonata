import { identsToString } from '../utils/identsToString.js';
import { merge } from '../utils/merge.js';
import { transform } from 'lightningcss';

let requestedClassNames, foundStyles;

/**
 * Return a list of classNames from the given `@copy` rule prelude.
 *
 * @param {Array} rulePrelude
 * @returns {Array}
 */
function extractClassNames(rulePrelude) {
    return identsToString(rulePrelude) // Restore the rule prelude to a string
        .split(',')
        .map(className => className.trim())
        .filter(Boolean); // Remove empty entries
}

/**
 * Register all CSS classes required by `@copy` rules.
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
                            .forEach(className => requestedClassNames.add(className));
                    }
                }
            }
        }
    });
}

/**
 * Store the style declarations for each of the necessary CSS classes.
 *
 * @param {Object} styles
 */
function searchClasses(styles) {
    for (let selector of styles.selectors) {
        selector = identsToString(selector);

        if (requestedClassNames.has(selector)) {
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
 * Search for the requested classes in the source code
 * and store their declarations.
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
 * Fetch and return the styles that the `@copy` rule expects
 * to be applied, based on the rule prelude.
 *
 * @param {Array} rulePrelude
 * @returns {{declarations: [], importantDeclarations: []}}
 */
function resolveDeclarationsToCopy(rulePrelude) {
    let declarationsToCopy = { declarations: [], importantDeclarations: [] };

    extractClassNames(rulePrelude)
        .forEach(className => {
            if (foundStyles.has(className)) {
                const found = foundStyles.get(className);

                declarationsToCopy.declarations.push(...found.declarations);
                declarationsToCopy.importantDeclarations.push(...found.importantDeclarations);
            }
        });

    return declarationsToCopy;
}

/**
 * Apply the copied styles to the given declaration block when the rule
 * is a `@copy` rule. If the rule is a `@media` or `@container` rule,
 * search its children for `@copy` rules to apply the styles.
 *
 * @param {Object} rule
 * @param {Object|null} declarationBlock - The declaration block to add the copied styles to.
 * @returns {Object}
 */
function applyCopiedStyles(rule, declarationBlock = null) {
    // If the rule is a `@media` or `@container` rule,
    // search its children for `@copy` rules instead
    if (rule.type === 'media' || rule.type === 'container') {
        const siblingDeclarationBlock = rule.value.rules.find(r => r.type === 'nested-declarations')?.value?.declarations;
        rule.value.rules = rule.value.rules.map(childRule => applyCopiedStyles(childRule, siblingDeclarationBlock));

        return rule;
    }

    if (rule.value.name !== 'copy') return rule;

    const rulePrelude = rule.value.prelude.value;
    const declarationsToCopy = resolveDeclarationsToCopy(rulePrelude);

    // If this rule is inside a `@media` or `@container` rule, there is
    // a possibility that there are no styles declared alongside
    // the @copy rule. In that case, the current `@copy` rule
    // is replaced by a new declaration block.
    if (declarationBlock === null) {
        return {
            type: 'nested-declarations',
            value: {
                declarations: {
                    importantDeclarations: declarationsToCopy.importantDeclarations,
                    declarations: declarationsToCopy.declarations,
                },
                loc: rule.value.loc,
            }
        };
    }

    // Otherwise, the styles are merged into the existing declaration block
    declarationBlock.declarations.unshift(...declarationsToCopy.declarations);
    declarationBlock.importantDeclarations.unshift(...declarationsToCopy.importantDeclarations);

    return {
        type: 'ignored',
        value: null
    };
}

/**
 * Copy the requested style declarations into the class
 * that contains the `@copy` rule.
 *
 * @returns {Object}
 */
export default function copyRule(src, id, customAtRules) {
    requestedClassNames = new Set();
    foundStyles = new Map();

    registerRequiredClasses(src, id, customAtRules);

    if (! requestedClassNames.size) return;

    storeContent(src, id, customAtRules);

    return {
        Rule: {
            style(rule) {
                rule.value.rules = rule.value.rules.map(childRule => applyCopiedStyles(childRule, rule.value.declarations));

                return rule;
            }
        }
    };
}
