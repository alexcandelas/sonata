import { symbols } from 'unocss';

export const checkbox = [
    ['checkbox', [
        {
            'appearance': 'none',
            'border-radius': '0.25rem',
            'flex-shrink': 0,
            'height': '1em',
            'position': 'relative',
            'top': '0.22em',
            'transition': 'background-color 150ms ease-out',
            'width': '1em',
        },
        {
            [symbols.selector]: selector => `${selector}:where(:checked)`,
            'background': `
                inline-svg("sonatacss/icons/check.svg", stroke: #fff, stroke-width: 3)
                center / 100% no-repeat
                var(--color-blue-50, colorFallback("blue-50"))`,
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
    ['checkbox--invalid', {
        [symbols.body]: '@copy .ring-invalid',
    }],
    ['checkbox--valid', {
        'border-color': 'var(--color-green-40, colorFallback("green-40"))',
    }],
];
