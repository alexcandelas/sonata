const pseudoElements = Object.fromEntries([
    'after',
    'before',
    'backdrop',
    'placeholder',
    ['file', 'file-selector-button'],
].map(s => Array.isArray(s) ? s : [s, s]));

const joined = Object.keys(pseudoElements).join('|');

export default function() {
    return {
        name: 'pseudoElements',
        match(input) {
            const regex = new RegExp(`^(${joined}):.+$`);
            const match = input.match(regex);

            if (! match) return input;

            return {
                matcher: input.slice(match[1].length + 1),
                handle: (input, next) => {
                    return next({
                        ...input,
                        pseudo: `${input.pseudo}::${pseudoElements[match[1]]}`,
                    })
                },
            };
        }
    };
}
