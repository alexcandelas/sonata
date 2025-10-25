/**
 * Extract selectors used by all @copy rules in the given CSS code.
 *
 * @param {string} css
 * @returns {Set}
 */
export default function extractCopiedSelectors(css) {
    const COPY_RULE_REGEX = /@copy +([^;{}\t\n\r]+)/g;
    const copiedSelectors = new Set();
    const copyRuleMatches = css.matchAll(COPY_RULE_REGEX);

    for (const [_, prelude] of copyRuleMatches) {
        const selectors = prelude.split(',')
            .map(s => s.replace(/["']/g, '').trim())
            .filter(Boolean);

        for (const selector of selectors) {
            copiedSelectors.add(selector);
        }
    }

    return copiedSelectors;
}
