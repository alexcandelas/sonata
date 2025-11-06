export const media = [
    [/^media$/, function* (_, { symbols }) {
        yield {
            'display': 'flex',
            'gap': '2rem',
        }
        yield {
            [symbols.selector]: selector => `${selector} > *`,
            'flex': 1,
        }
        yield {
            [symbols.selector]: selector => `${selector}__img, ${selector} :is(canvas, embed, figure, img, picture, svg, video)`,
            'flex': 'none',
        }
    }],
];
