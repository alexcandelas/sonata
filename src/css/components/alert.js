import { symbols } from 'unocss';

export const alert = [
    ['alert', {
        'background-color': 'var(--color-gray-5, colorFallback("gray-5"))',
        'border-radius': '0.25rem',
        'color': 'var(--color-gray-70, colorFallback("gray-70"))',
        'font-size': '15px',
        'padding': '0.75em 1em',
    }],
    [/^alert--(info|danger|success|warning)$/, ([_, type]) => {
        const colors = {
            info: ['blue-10', 'blue-75'],
            danger: ['red-10', 'red-70'],
            success: ['green-10', 'green-70'],
            warning: ['yellow-5', 'yellow-70'],
        };

        return {
            'background-color': `var(--color-${colors[type][0]}, colorFallback("${colors[type][0]}"))`,
            'color': `var(--color-${colors[type][1]}, colorFallback("${colors[type][1]}"))`,
        };
    }],
    /**
     * Outlined variants.
     */
    [/^alert--outline(?:-(info|danger|success|warning))?$/, ([_, type]) => {
        type = type || 'neutral';

        const colors = {
            neutral: ['gray-35', 'gray-70'],
            info: ['blue-35', 'blue-75'],
            danger: ['red-35', 'red-70'],
            success: ['green-35', 'green-70'],
            warning: ['yellow-30', 'yellow-70'],
        };

        return {
            'background-color': 'transparent',
            'border': `1px solid var(--color-${colors[type][0]}, colorFallback("${colors[type][0]}"))`,
            'color': `var(--color-${colors[type][1]}, colorFallback("${colors[type][1]}"))`,
        };
    }],
    /**
     * Solid variants.
     */
    [/^alert--solid(?:-(info|danger|success|warning))?$/, ([_, type]) => {
        type = type || 'neutral';

        const colors = {
            neutral: 'gray-60',
            info: 'blue-50',
            danger: 'red-50',
            success: 'green-45',
            warning: 'orange-35',
        };

        return {
            'background-color': `var(--color-${colors[type]}, colorFallback("${colors[type]}"))`,
            'color': '#fff',
        };
    }],
    /**
     * Bordered.
     */
    [/^alert--bordered$/, function* (_, { symbols }) {
        const colors = {
            info: 'blue-25',
            danger: 'red-25',
            success: 'green-30',
            warning: 'yellow-20',
        };

        yield {
            'border': '1px solid var(--color-gray-20, colorFallback("gray-20"))',
        }

        for (const type in colors) {
            yield {
                [symbols.selector]: selector => `${selector}:where(.alert--${type})`,
                'border-color': `var(--color-${colors[type]}, colorFallback("${colors[type]}"))`,
            }
        }
    }],
    /**
     * Accent.
     */
    [/^alert--(top|right|bottom|left)-accent$/, function* ([_, side], { symbols }) {
        const colors = {
            info: 'blue-30',
            danger: 'red-35',
            success: 'green-25',
            warning: 'yellow-20',
            'outline': 'gray-35',
            'outline-info': 'blue-35',
            'outline-danger': 'red-35',
            'outline-success': 'green-35',
            'outline-warning': 'yellow-30',
        };

        const sharpAngles = {
            top: ['top-left', 'top-right'],
            bottom: ['bottom-left', 'bottom-right'],
            left: ['bottom-left', 'top-left'],
            right: ['bottom-right', 'top-right'],
        };

        yield {
            [`border-${side}`]: '4px solid var(--color-gray-30, colorFallback("gray-30"))',
            ...sharpAngles[side].reduce((acc, angle) => {
                acc[`border-${angle}-radius`] = 0;
                return acc;
            }, {}),
        }

        for (const type in colors) {
            yield {
                [symbols.selector]: selector => `${selector}:where(.alert--${type})`,
                [`border-${side}-color`]: `var(--color-${colors[type]}, colorFallback("${colors[type]}"))`,
            }
        }
    }],
    /**
     * Icons.
     */
    [/^alert--has(-solid)?-icon$/, function* ([_, solid = ''], { symbols }) {
        const colors = {
            info: 'blue-40',
            danger: 'red-40',
            success: 'green-40',
            warning: 'yellow-30',
        };

        yield {
            'background-image': `inline-svg("sonatacss/icons/alert${solid}.svg", color: colorFallback("gray-35"))`,
            'background-origin': 'content-box',
            'background-position': '-2.5em 0.05em',
            'background-repeat': 'no-repeat',
            'background-size': '1.5em',
            'padding-left': '3.5em',
        }

        for (const type in colors) {
            yield {
                [symbols.selector]: selector => `${selector}:where(.alert--${type}), ${selector}:where(.alert--outline-${type})`,
                'background-image': `inline-svg("sonatacss/icons/${type}${solid}.svg", color: colorFallback("${colors[type]}"))`,
            }
            yield {
                [symbols.selector]: selector => `${selector}:where(.alert--solid-${type})`,
                'background-image': `inline-svg("sonatacss/icons/${type}${solid}.svg", color: #fff)`,
            }
        }
    }],
    /**
     * Small variant.
     */
    ['alert--sm', [
        {
            'font-size': '0.8rem',
            'padding-block': '0.5em',
        },
        {
            [symbols.selector]: selector => `
                ${selector}:where(.alert--has-icon), 
                ${selector}:where(.alert--has-solid-icon)
            `,
            'background-position': '-2.25em 0.05em',
            'padding-left': '3em',
        },
    ]],
];
