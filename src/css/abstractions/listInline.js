export const listInline = [
    [/^list-inline$/, function* (_, { symbols }) {
        yield {
            'list-style': 'none',
            'padding-left': '0',
        }
        yield {
            [symbols.selector]: selector => `${selector} > li`,
            'display': 'inline-block',
        }
    }],
];
