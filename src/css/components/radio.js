import { symbols } from 'unocss';

export const radio = [
    ['radio', [
        {
            'appearance': 'none',
            'background-size': '1.5em',
            'border-radius': '50%',
            'flex-shrink': 0,
            'height': '1em',
            'position': 'relative',
            'top': '0.22em',
            'transition': 'background-size 100ms linear',
            'width': '1em',
        },
        {
            [symbols.selector]: selector => `${selector}:where(:checked)`,
            'background': `var(--color-blue-50, colorFallback("blue-50")) inline-svg("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'><circle fill='#fff' cx='4' cy='4' r='2'></circle></svg>") center center no-repeat`,
            'background-size': '0.75em',
            'border-color': 'var(--color-blue-50, colorFallback("blue-50"))',
        },
        {
            [symbols.selector]: selector => `${selector}:focus-visible`,
            'box-shadow': 'var(--offset-ring)',
            'outline': 0,
        },
        {
            [symbols.selector]: selector => `${selector}:active:where(:not(:disabled))`,
            'filter': 'brightness(0.95)',
        },
    ]],
    /**
     * Validation.
     */
    ['radio--invalid', {
        'border-color': 'var(--color-red-50, colorFallback("red-50"))',
        'box-shadow': '0 0 0.25rem var(--color-red-55, colorFallback("red-55"))',
    }],
    ['radio--valid', {
        'border-color': 'var(--color-green-40, colorFallback("green-40"))',
    }],
];
