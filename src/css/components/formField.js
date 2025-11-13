import { symbols } from 'unocss';

const sharedValidationStyles = [
    {
        [symbols.selector]: selector => `${selector}:where(:not(select):not([type="file" i]))`,
        'background-position': 'right 0.5em center',
        'background-size': '1.5em',
        'padding-right': '2.25em',
    },
    {
        [symbols.selector]: selector => `${selector}:is(select):where(:not([multiple]):not([size]))`,
        'background-position': 'right 0.5em center, right 1.8em center',
        'background-size': '1.25em, 1.5em',
        'padding-right': '3.8em',
    },
    /**
     * Validation for file inputs.
     */
    {
        [symbols.selector]: selector => `${selector}:is([type="file" i])`,
        'background-position': 'right calc(var(--form-field-file-button-width) + 0.5em) center',
        'background-size': '1.5em',
        'padding-right': 'calc(var(--form-field-file-button-width) + 2.25em)',
    },
    {
        [symbols.selector]: selector => `${selector}:is([type="file" i])::file-selector-button`,
        'margin-right': 'calc(-1 * var(--form-field-file-button-width) - 2.25em)',
    },
    /**
     * Some extra padding is applied to the right side of `textarea` elements
     * so that the validation icon is not covered by the scrollbar.
     *
     * The `no-scrollbar` modifier resets the icon position when
     * there is no visible scrollbar. JavaScript required.
     *
     * 1. Rem units are used on the right side to keep the same distance
     * from the scrollbar when using different font sizes.
     */
    {
        [symbols.selector]: selector => `textarea${selector}`,
        'background-position': 'right 1.25rem top 0.55em',
        'padding-right': '3rem',
    },
    {
        [symbols.selector]: selector => `textarea${selector}.form-field--no-scrollbar`,
        'background-position': 'right 0.5em top 0.55em', // 1
        'padding-right': '2.25rem',
    },
];

export const formField = [
    ['form-field', [
        {
            '--form-field-icon-invalid': 'inline-svg("sonatacss/icons/warning-solid.svg", color: colorFallback("yellow-30"))',
            '--form-field-icon-valid': 'inline-svg("sonatacss/icons/success-solid.svg", color: colorFallback("green-40"))',
            '--form-field-padding-x': '0.75em',
            '--form-field-padding-y': '0.5em',
            'background-repeat': 'no-repeat',
            'border-radius': 'var(--radius-md)',
            'padding': 'var(--form-field-padding-y) var(--form-field-padding-x)',
            'position': 'relative',
            'width': '100%',
        },
        /**
         * Spacing between form field, label and help text.
         */
        {
            [symbols.selector]: selector => `:where(label, .help-text) + ${selector}`,
            'margin-top': '0.375rem',
        },
        {
            [symbols.selector]: selector => `${selector}:where(:has(+ .form-invalid, + .form-valid, + .help-text))`,
            'margin-bottom': '0.375rem',
        },
        /**
         * Reset the default appearance of `select` elements to use a custom caret
         * icon for cross-browser consistency.
         *
         * The icon is not applied to `select` elements with `multiple` or `size`
         * attributes, as they are rendered differently between browsers.
         *
         * 1. Long text is truncated with an ellipsis so that it doesn't
         * appear cut off.
         */
        {
            [symbols.selector]: selector => `select${selector}`,
            '--form-field-dropdown-icon': 'inline-svg("sonatacss/icons/chevron-down.svg", color: colorFallback("gray-70"))',
            'appearance': 'none',
            'text-overflow': 'ellipsis', // 1
        },
        {
            [symbols.selector]: selector => `select${selector}:where(:not([multiple]):not([size]))`,
            'background-image': 'var(--form-field-dropdown-icon)',
            'background-position': 'right 0.5em center',
            'background-size': '1.25em',
            'padding-right': '2.25em',
        },
        /**
         * Options in multi-row `select` elements are truncated with an ellipsis
         * to indicate users that there is more text than currently visible.
         */
        {
            [symbols.selector]: selector => `${selector} option`,
            [symbols.body]: '@copy .truncate',
        },
        /**
         * Reset the default appearance of `file` type inputs to look consistent
         * with the visual style of other form elements.
         */
        {
            [symbols.selector]: selector => `${selector}:where([type="file" i])`,
            '--form-field-file-button-height': '(1em * var(--line-height-base) + var(--form-field-padding-y) * 2)',
            '--form-field-file-button-width': '(var(--form-field-file-button-height) * 1.1)',
            '--form-field-icon-file': 'inline-svg("sonatacss/icons/folder-search.svg", color: colorFallback("gray-70"))',
            'padding-right': 'calc(var(--form-field-file-button-width) + var(--form-field-padding-x))',
        },
        /**
         * Customize the native button of `file` type inputs
         * for cross-browser consistency.
         */
        {
            [symbols.selector]: selector => `${selector}::file-selector-button`,
            'align-items': 'center',
            'background': 'var(--color-gray-10, colorFallback("gray-10")) var(--form-field-icon-file) center center no-repeat',
            'background-size': '1.5em',
            'border': 0,
            'border-left': '1px solid var(--color-gray-25, colorFallback("gray-25"))',
            'color': 'transparent',
            'display': 'inline-flex',
            'float': 'right',
            'height': 'calc(var(--form-field-file-button-height))',
            'justify-content': 'center',
            'line-height': 'inherit',
            'margin': `
                calc(-1 * var(--form-field-padding-y))
                calc(-1 * var(--form-field-file-button-width) - var(--form-field-padding-x))
                calc(-1 * var(--form-field-padding-y))
                var(--form-field-padding-x)`,
            'overflow': 'hidden',
            'transition': 'background-color 150ms ease-out',
            'width': 'calc(var(--form-field-file-button-width))',
        },
        {
            [symbols.selector]: selector => `${selector}:hover::file-selector-button`,
            'background-color': 'var(--color-gray-15, colorFallback("gray-15"))',
        },
        {
            [symbols.selector]: selector => `${selector}:disabled::file-selector-button`,
            'background-color': 'transparent',
        },
        /**
         * Show a "focus ring" when the element is focused.
         */
        {
            [symbols.selector]: selector => `${selector}:focus, ${selector}--focus`,
            [symbols.body]: `
                @copy .focused;
                border-color: var(--color-blue-30, colorFallback("blue-30"));
            `,
        },
    ]],
    /**
     * Dim the text of `file` type inputs to give it the appearance
     * of a placeholder when there are no files selected.
     */
    ['form-field--empty', {
        [symbols.selector]: selector => `${selector}[type="file" i]`,
        'color': 'var(--color-gray-45, colorFallback("gray-45"))',
    }],
    /**
     * Hide the customized selector button.
     */
    ['form-field--no-btn', [
        {
            [symbols.selector]: selector => `${selector}:where([type="file" i])`,
            'padding-right': 'var(--form-field-padding-x)',
        },
        {
            [symbols.selector]: selector => `${selector}:where([type="file" i])::file-selector-button`,
            'display': 'none',
        },
    ]],
    ['form-field--invalid', [
        ...sharedValidationStyles,
        {
            [symbols.body]: '@copy .ring-invalid',
        },
        {
            [symbols.selector]: selector => `${selector}:where(:not(select))`,
            'background-image': 'var(--form-field-icon-invalid)',
        },
        {
            [symbols.selector]: selector => `${selector}:is(select):where(:not([multiple]):not([size]))`,
            'background-image': 'var(--form-field-dropdown-icon), var(--form-field-icon-invalid)',
        },
    ]],
    ['form-field--valid', [
        ...sharedValidationStyles,
        {
            'border-color': 'var(--color-green-40, colorFallback("green-40"))',
        },
        {
            [symbols.selector]: selector => `${selector}:where(:not(select))`,
            'background-image': 'var(--form-field-icon-valid)',
        },
        {
            [symbols.selector]: selector => `${selector}:is(select):where(:not([multiple]):not([size]))`,
            'background-image': 'var(--form-field-dropdown-icon), var(--form-field-icon-valid)',
        },
    ]],
];
