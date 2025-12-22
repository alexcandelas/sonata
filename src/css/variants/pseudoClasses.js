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
            const regex = new RegExp(`^(not-)?(${joined}):.+$`);
            const match = matcher.match(regex);

            if (! match) return matcher;

            const [_, negation, pseudoClass] = match;
            const newMatcher = matcher.slice((negation?.length ?? 0) + pseudoClass.length + 1);

            if (pseudoClass === 'hover' && negation) {
                return [
                    {
                        matcher: newMatcher,
                        selector: s => `${s}:not(:${pseudoClasses[pseudoClass]})`,
                    },
                    {
                        matcher: newMatcher,
                        parent: '@media not (hover: hover)',
                    },
                ];
            }

            return {
                matcher: newMatcher,
                selector: s => negation
                    ? `${s}:not(:${pseudoClasses[pseudoClass]})`
                    : `${s}:${pseudoClasses[pseudoClass]}`,
                parent: pseudoClass === 'hover' ? `@media (hover: hover)` : null
            };
        },
    };
}
