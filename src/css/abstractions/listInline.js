import { symbols } from 'unocss';

export const listInline = [
    ['list-inline', [
        {
            'list-style': 'none',
            'padding-left': '0',
        },
        {
            [symbols.selector]: selector => `${selector} > li`,
            'display': 'inline-block',
        },
    ]],
];
