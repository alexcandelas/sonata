import { symbols } from 'unocss';

export const media = [
    ['media', [
        {
            'display': 'flex',
            'gap': '2rem',
        },
        {
            [symbols.selector]: selector => `${selector} > *`,
            'flex': 1,
        },
        {
            [symbols.selector]: selector => `${selector}__img, ${selector} :is(canvas, embed, figure, img, picture, svg, video)`,
            'flex': 'none',
        },
    ]],
];
