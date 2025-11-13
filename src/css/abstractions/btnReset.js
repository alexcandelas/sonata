import { symbols } from 'unocss';

export const btnReset = [
    ['btn-reset', [
        {
            'all': 'unset',
        },
        {
            [symbols.selector]: selector => `${selector}:where(:not(:disabled))`,
            'cursor': 'pointer',
        },
        {
            [symbols.selector]: selector => `${selector}:focus-visible`,
            [symbols.body]: '@copy .focused',
        },
    ]],
];
