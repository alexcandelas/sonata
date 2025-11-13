import { symbols } from 'unocss';

export const media = [
    ['help-text', {
        'font-size': '0.8rem',
        'color': 'var(--color-gray-55, colorFallback("gray-55"))',
    }],
    ['form-invalid', {
        [symbols.body]: `
            @copy .list-reset;
            color: var(--color-red-55, colorFallback("red-55"));
            font-size: 0.8rem;
        `,
    }],
    ['form-valid', {
        'font-size': '0.8rem',
        'color': 'var(--color-green-55, colorFallback("green-55"));'
    }],
];
