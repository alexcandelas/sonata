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
            const regex = new RegExp(`^(${joined}):.+$`);
            const match = matcher.match(regex);

            if (! match) return matcher;

            return {
                matcher: matcher.slice(match[1].length + 1),
                selector: s => `${s}[${attributes[match[1]]}="true"]`,
            };
        }
    };
}
