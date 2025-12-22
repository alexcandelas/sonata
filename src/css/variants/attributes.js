const attributes = Object.fromEntries([
    // ARIA
    'aria-busy',
    'aria-checked',
    'aria-disabled',
    'aria-expanded',
    'aria-hidden',
    'aria-pressed',
    'aria-readonly',
    'aria-required',
    'aria-selected',
].map(s => Array.isArray(s) ? s : [s, s]));

const joined = Object.keys(attributes).join('|');

export default function() {
    return {
        name: 'attributes',
        match(matcher) {
            const regex = new RegExp(`^(not-)?(${joined}):.+$`);
            const match = matcher.match(regex);

            if (! match) return matcher;

            const [_, negation, attribute] = match;

            return {
                matcher: matcher.slice((negation?.length ?? 0) + attribute.length + 1),
                selector: s => negation
                    ? `${s}:not([${attributes[attribute]}="true"])`
                    : `${s}[${attributes[attribute]}="true"]`,
            };
        }
    };
}
