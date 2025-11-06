import { identsToString } from '../utils/identsToString.js';
import { merge } from '../utils/merge.js';
import { transform } from 'lightningcss';

let copiedSelectors, copiedStyles;

/**
 * Return a list of selectors from the given `@copy` rule prelude.
 *
 * @param {Array} prelude
 * @returns {Array}
 */
function extractSelectorsFromPrelude(prelude) {
    return identsToString(prelude) // Restore the rule prelude to a string
        .split(',')
        .map(className => className.trim())
        .filter(Boolean);
}

/**
 * Store the style declarations for each of the necessary CSS classes.
 *
 * @param {Object} styles
 */
function searchClasses(styles) {
    for (const selectorNodes of styles.selectors) {
        const selector = identsToString(selectorNodes);

        if (copiedSelectors.has(selector)) {
            const stored = copiedStyles.get(selector) || {};

            // Merge possible multiple nested declarations objects into a single one
            let nestedDeclarations = styles.rules.reduce((acc, rule) => ({...acc, ...rule.value.declarations}), {});

            const copyRuleSelectors = styles.rules.filter(rule => rule.type === 'custom' && rule.value?.name === 'copy')
                .reduce((acc, rule) => {
                    const prelude = rule.value.prelude.value;

                    return [...acc, ...extractSelectorsFromPrelude(prelude)]
                }, stored.copyRuleSelectors || []);

            copiedStyles.set(selector, {
                declarations: merge({}, stored.declarations, styles.declarations, nestedDeclarations),
                copyRuleSelectors,
            });
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
 * Return the styles that the `@copy` rule expect to apply,
 * using the selectors extracted from the rule prelude.
 *
 * @param {Array} selectors
 * @param {Array} declarations
 * @param {Array} importantDeclarations
 * @returns {{declarations: [], importantDeclarations: []}}
 */
function resolveDeclarationsToCopy(selectors, declarations = [] , importantDeclarations = []) {
    for (const className of selectors) {
        if (! copiedStyles.has(className)) continue;

        const found = copiedStyles.get(className);
        const copyRuleSelectors = found.copyRuleSelectors || [];
        declarations.push(...found.declarations.declarations);
        importantDeclarations.push(...found.declarations.importantDeclarations);

        if (copyRuleSelectors.length) {
            resolveDeclarationsToCopy(copyRuleSelectors, declarations, importantDeclarations);
        }
    }

    return { declarations, importantDeclarations };
}

/**
 * Apply the copied styles to the given declaration block when the rule
 * is a `@copy` rule. If the rule is a `@media` or `@container` rule,
 * search its children for `@copy` rules to apply the styles.
 *
 * @param {Object} rule - The candidate for a @copy rule
 * @param {Object} parentValue - The value from the parent rule
 * @param {Object|null} targetBlock - The declarations block to apply the styles to
 * @returns {Object}
 */
function applyCopiedStyles(rule, parentValue, targetBlock = null) {
    // If the rule is a `@media` or `@container` rule,
    // search its children for `@copy` rules instead
    if (rule.type === 'media' || rule.type === 'container') {
        const nestedTargetBlock = rule.value.rules.find(r => r.type === 'nested-declarations')?.value?.declarations;

        rule.value.rules = rule.value.rules.map(
            childRule => applyCopiedStyles(childRule, rule.value, nestedTargetBlock)
        );

        return rule;
    }

    if (rule.value?.name !== 'copy') return rule;

    const rulePrelude = rule.value.prelude.value;
    const declarationsToCopy = resolveDeclarationsToCopy(extractSelectorsFromPrelude(rulePrelude));

    // If this rule is inside a `@media` or `@container` rule, there is
    // a possibility that the only content in the block is the
    // @copy rule. In that case, the current `@copy` rule
    // is replaced by a new declaration block.
    if (targetBlock === null || targetBlock === undefined) {
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
    targetBlock.declarations.unshift(...declarationsToCopy.declarations);
    targetBlock.importantDeclarations.unshift(...declarationsToCopy.importantDeclarations);

    return {
        type: 'ignored',
        value: null
    };
}

/**
 * Apply the requested styles into the block that contains the `@copy` rule.
 *
 * @param {string} src
 * @param {string} id
 * @param {Object} customAtRules
 * @param {Set} _copiedSelectors
 * @returns {Object}
 */
export default function copyRule(src, id, customAtRules, _copiedSelectors) {
    if (! _copiedSelectors.size) return;

    copiedSelectors = _copiedSelectors;
    copiedStyles = new Map();

    storeContent(src, id, customAtRules);

    return {
        Rule: {
            style(rule) {
                rule.value.rules = rule.value.rules.map(
                    childRule => applyCopiedStyles(childRule, rule.value, rule.value.declarations)
                );

                return rule;
            }
        }
    };
}
