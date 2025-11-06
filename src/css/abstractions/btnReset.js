export const btnReset = [
    [/^btn-reset$/, function* (_, { symbols }) {
        yield {
            'all': 'unset',
        }
        yield {
            [symbols.selector]: selector => `${selector}:where(:not(:disabled))`,
            'cursor': 'pointer',
        }
        yield {
            [symbols.selector]: selector => `${selector}:focus-visible`,
            [symbols.body]: '@copy .focused',
        }
    }],
];
