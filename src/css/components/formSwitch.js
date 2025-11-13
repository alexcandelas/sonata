import { symbols } from 'unocss';

const sharedLabelStyles = {
    'align-items': 'center',
    'display': 'flex',
    'font-size': '11px',
    'height': '100%',
    'justify-content': 'center',
    'padding': 0,
    'pointer-events': 'none',
    'position': 'absolute',
    'top': 0,
    'transition': 'color 150ms ease-out, opacity 150ms ease-out',
    'width': '60%',
    'z-index': 4,
};

const sharedIconStyles = [
    {
        'align-items': 'center',
        'align-self': 'center',
        'display': 'flex',
        'height': 'var(--form-switch-knob-size)',
        'justify-content': 'center',
        'justify-self': 'center',
        'opacity': 0,
        'position': 'absolute',
        'transition': 'opacity 150ms ease-out, transform 150ms ease-out',
        'width': 'var(--form-switch-knob-size)',
        'z-index': 1,
    },
    {
        [symbols.selector]: selector => `.form-switch__input:checked ~ ${selector}`,
        'transform': 'translateX(calc(var(--form-switch-width) - 100% - 0.5em))',
    }
];

const switchAnimation = `
    @keyframes form-switch-on {
        0% { transform: translateX(0); }
        50% { transform: translateX(calc(var(--form-switch-height) / 2)) scaleX(1.4); }
        100% {transform: translateX(calc(var(--form-switch-width) - 100% - 0.5em)); }
    }
`;

/**
 * Component that makes checkboxes look like a toggle switch.
 * Works by hiding a native `checkbox` type input while
 * keeping it accessible to assistive technologies.
 *
 * Structure example:
 *
 * .form-switch (wrapper)
 *     .form-switch__input (hidden checkbox)
 *     .form-switch__icon-on (optional)
 *     .form-switch__icon-off (optional)
 *     .form-switch__label-on (optional)
 *     .form-switch__label-off (optional)
*/
export const formSwitch = [
    ['form-switch', [
        {
            '--form-switch-height': '1.5em',
            '--form-switch-width': 'calc(var(--form-switch-height) * 1.75)',
            '--form-switch-track-bg-off': 'var(--color-gray-20, colorFallback("gray-20"))',
            '--form-switch-track-bg-on': 'var(--color-blue-45, colorFallback("blue-45"))',
            '--form-switch-knob-bg-off': '#fff',
            '--form-switch-knob-bg-on': '#fff',
            '--form-switch-knob-size': 'calc(var(--form-switch-height) - 0.375em)',
            'align-items': 'center',
            'background-color': 'var(--form-switch-track-bg-off)',
            'border-radius': '9999px',
            'box-shadow': '0 1px 3px rgba(0, 0, 0, 0.1) inset',
            'display': 'inline-flex',
            'flex-shrink': 0,
            'height': 'var(--form-switch-height)',
            'isolation': 'isolate',
            'justify-content': 'flex-start',
            'padding': '0.25em',
            'position': 'relative',
            'transition': 'background-color 150ms ease-out',
            'width': 'var(--form-switch-width)',
        },
        {
            [symbols.selector]: selector => `${selector}:has(:checked)`,
            'background-color': 'var(--form-switch-track-bg-on)',
        },
        {
            [symbols.selector]: selector => `${selector}:has(:focus-visible)`,
            'box-shadow': 'var(--offset-ring)',
        },
        {
            [symbols.selector]: selector => `${selector}:has(:disabled)`,
            [symbols.body]: '@copy .disabled',
        },
        {
            [symbols.selector]: selector => `${selector}::after`,
            'background-color': 'var(--form-switch-knob-bg-off, #fff)',
            'border-radius': '50%',
            'box-shadow': '0 1px 2px rgba(0, 0, 0, 0.2)',
            'content': '""',
            'display': 'grid',
            'flex-shrink': 0,
            'grid-template': '1fr / 1fr',
            'height': 'var(--form-switch-knob-size)',
            'transition': 'background-color 150ms ease-out, transform 150ms ease-out',
            'width': 'var(--form-switch-knob-size)',
        },
        {
            [symbols.selector]: selector => `${selector}:where(:has(:checked))::after`,
            'background-color': 'var(--form-switch-knob-bg-on, #fff)',
            'transform': 'translateX(calc(var(--form-switch-width) - 100% - 0.5em))',
        },
    ]],
    ['form-switch__input', {
        'height': '100%',
        'inset': 0,
        'opacity': 0,
        'position': 'absolute',
        'width': '100%',
        'z-index': 2,
    }],
    /**
     * A custom animation between states.
     */
    ['form-switch--off', [
        {
            [symbols.selector]: selector => `${selector}::after`,
            'animation': 'form-switch-on 150ms ease-out reverse',
        },
        switchAnimation,
    ]],
    ['form-switch--on', [
        {
            [symbols.selector]: selector => `${selector}::after`,
            'animation': 'form-switch-on 150ms ease-out',
        },
        switchAnimation,
    ]],
    /**
     * Optionally, a text or icon label can be displayed
     * beside the knob for both states.
     */
    ['form-switch__label-off', [
        {
            ...sharedLabelStyles,
            'opacity': 1,
            'right': 0,
        },
        {
            [symbols.selector]: selector => `input:where(:checked) ~ ${selector}`,
            'opacity': 0,
        },
    ]],
    ['form-switch__label-on', [
        {
            ...sharedLabelStyles,
            'left': 0,
            'opacity': 0,
        },
        {
            [symbols.selector]: selector => `input:where(:checked) ~ ${selector}`,
            'opacity': 1,
        },
    ]],
    /**
     * Optionally, icons for the `on` and `off` states
     * can be displayed inside the knob.
     */
    ['form-switch__icon-off', [
        ...sharedIconStyles,
        {
            [symbols.selector]: selector => `input:where(:not(:checked)) ~ ${selector}`,
            'opacity': 1,
        },
    ]],
    ['form-switch__icon-on', [
        ...sharedIconStyles,
        {
            [symbols.selector]: selector => `input:where(:checked) ~ ${selector}`,
            'opacity': 1,
        },
    ]],
];
