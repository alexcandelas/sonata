/**
 * Concatenate a selector with its parent class names
 * when using the `&` symbol.
 *
 * @param {Object} selector
 * @param {string[]} parentClasses
 * @returns {Array|Object}
 */
function concatenateSelector(selector, parentClasses) {
    if (! Array.isArray(selector) || ! selector.length) {
        return selector;
    }

    selector.forEach((component, i) => {
        // .foo { &--bar } -> .foo { &:where(.foo--bar) }
        if (component.type === 'type' && selector[i - 1]?.type === 'nesting') {
            selector[i] = {
                type: 'pseudo-class',
                kind: 'where',
                selectors: parentClasses.map(parentClass => ([
                    { type: 'class', name: parentClass + component.name }
                ]))
            }
        }

        // Concatenate inside pseudo-classes: .foo { :not(&--bar) } -> .foo { :not(.foo--bar) }
        if (component.type === 'pseudo-class' && component.selectors?.length) {
            selector[i].selectors.forEach((s, j) => {
                selector[i].selectors[j] = concatenateSelector(s, parentClasses)
            });
        }
    });

    return selector;
}

/**
 * Recursively inspects and transforms a rule by applying
 * nested class concatenation when applicable.
 *
 * @param {Object} rule
 * @param {string[]} parentClasses
 * @returns {Object}
 */
function transformRule(rule, parentClasses = []) {
    let selectors = rule.value?.selectors;
    let childRules = rule.value?.rules;
    let newParentClasses = parentClasses;

    if (rule.type === 'style' && selectors) {
        if (parentClasses.length) {
            rule.value.selectors = selectors.map(s => concatenateSelector(s, parentClasses));
        }

        newParentClasses = selectors
            .map(s => {
                const filteredComponents = s.filter((component) => component.type !== 'attribute');
                const lastComponent = filteredComponents[filteredComponents.length - 1];

                return lastComponent?.type === 'class' ? lastComponent.name : null;
            })
            .filter(Boolean);
    } else if (rule.type === 'style') {
        parentClasses = [];
    }

    // Transform child rules
    if (childRules?.length) {
        rule.value.rules = childRules.map(childRule => transformRule(childRule, newParentClasses));
    }

    return rule;
}

/**
 * Allow nested class concatenation using the `&` symbol.
 *
 * @example
 * Input:
 * .foo { &-bar { color: #000 } }
 *
 * Output:
 * .foo { &:where(.foo-bar) { color: #000 } }
 */
export default function concatenateNestedClasses() {
    return {
         StyleSheet(stylesheet) {
             if (stylesheet?.rules?.length) {
                 stylesheet.rules = stylesheet.rules.map(rule => transformRule(rule))
             }

             return stylesheet;
        },
    }
}
