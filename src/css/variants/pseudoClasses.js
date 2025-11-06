const pseudoClasses = Object.fromEntries([
    // Inputs
    'autofill',
    'enabled',
    'disabled',
    'placeholder-shown',
    'default',
    'checked',
    'indeterminate',
    'valid',
    'invalid',
    'in-range',
    'out-of-range',
    'required',
    'optional',
    'user-valid',
    'user-invalid',

    // Structural
    'empty',
    'first-of-type',
    'last-of-type',
    ['first', 'first-child'],
    ['last', 'last-child'],
    ['even', 'nth-child(even)'],
    ['odd', 'nth-child(odd)'],

    // Interactions
    'hover',
    'active',
    'focus',
    'focus-visible',
    'focus-within',
].map(s => Array.isArray(s) ? s : [s, s]));

const joined = Object.keys(pseudoClasses).join('|');

export default function() {
    return {
        name: 'pseudoClasses',
        match(matcher) {
            const regex = new RegExp(`^(${joined}):.+$`);
            const match = matcher.match(regex);

            if (! match) return matcher;

            return {
                matcher: matcher.slice(match[1].length + 1),
                selector: s => `${s}:${pseudoClasses[match[1]]}`,
            };
        },
        multiPass: true,
    };
}
