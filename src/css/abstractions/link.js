export const link = [
    [/^link$/, function* (_, { symbols }) {
        yield {
            [symbols.body]: `
                @copy .btn-reset, a:where([href]);
                cursor: pointer;
            `,
        }
        yield {
            [symbols.selector]: selector => `${selector}:hover`,
            [symbols.body]: '@copy a:where([href]:hover);',
        }
        yield {
            [symbols.selector]: selector => `${selector}:focus`,
            [symbols.body]: '@copy a:where([href]:focus);',
        }
    }],
];
