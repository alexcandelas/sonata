import { symbols } from 'unocss';

export const stack = [
    ['stack', [
        {
            'display': 'grid',
            'place-items': 'center',
        },
        {
            [symbols.selector]: selector => `${selector} > *`,
            'grid-area': '1 / 1',
        },
    ]],
];
