import { symbols } from 'unocss';

export const table = [
    ['table', [
        {
            '--table-padding-x': '0.75em',
            '--table-padding-y': '0.75em',
            '--table-color-border': 'var(--color-gray-25, colorFallback("gray-25"))',
            'caption-side': 'bottom',
            'font-size': 'inherit',
            'max-width': '100%',
        },
        {
            [symbols.selector]: selector => `${selector} :where(thead)`,
            'border-bottom': '2px solid var(--table-color-border)',
            'vertical-align': 'bottom',
        },
        {
            [symbols.selector]: selector => `${selector} :where(tbody)`,
            'vertical-align': 'top',
        },
        {
            [symbols.selector]: selector => `${selector} :where(caption)`,
            'color': 'var(--color-gray-60, colorFallback("gray-60"))',
            'font-size': '90%',
            'padding': 'var(--table-padding-y) var(--table-padding-x)',
            'text-align': 'left',
        },
        {
            [symbols.selector]: selector => `${selector} :where(td, th)`,
            'padding': 'var(--table-padding-y) var(--table-padding-x)',
        },
        {
            [symbols.selector]: selector => `${selector} :where(td)`,
            'border-bottom': '1px solid var(--table-color-border)',
        },
        {
            [symbols.selector]: selector => `${selector} :where(th), ${selector} :where(tfoot)`,
            'font-weight': 600,
        },
    ]],
    /**
     * Zebra stripes in body rows.
     */
    ['table--striped', {
        [symbols.selector]: selector => `${selector} :where(tbody > tr:nth-child(even))`,
        'background-color': 'var(--color-gray-5, colorFallback("gray-5"))',
    }],
    /**
     * Highlight rows when cursor is over them.
     */
    ['table--hover', [
        {
            [symbols.selector]: selector => `${selector} :where(tbody tr)`,
            'transition': 'background-color 150ms ease-out',
        },
        {
            [symbols.selector]: selector => `${selector} :where(tbody tr):hover`,
            [symbols.parent]: '@media (hover: hover)',
            'background-color': 'var(--color-gray-10, colorFallback("gray-10"))',
        },
    ]],
    /**
     * Add borders to all cells.
     */
    ['table--bordered', [
        {
            [symbols.selector]: selector => `${selector} :where(thead)`,
            'border-bottom': 0,
        },
        {
            [symbols.selector]: selector => `${selector} :where(td, th)`,
            'border': '1px solid var(--table-color-border)',
        },
    ]],
    /**
     * Remove borders from body cells.
     */
    ['table--borderless', {
        [symbols.selector]: selector => `${selector} :where(td)`,
        'border-width': 0,
    }],
    /**
     * Size variants.
     */
    ['table--xs', {
        [symbols.selector]: selector => `${selector} :where(td, th)`,
        '--table-padding-x': '0.5em',
        '--table-padding-y': '0.25em',
    }],
    ['table--sm', {
        [symbols.selector]: selector => `${selector} :where(td, th)`,
        '--table-padding-x': '0.625em',
        '--table-padding-y': '0.5em',
    }],
    ['table--lg', {
        [symbols.selector]: selector => `${selector} :where(td, th)`,
        '--table-padding-x': '1em',
        '--table-padding-y': '1em',
    }],
    ['table--xl', {
        [symbols.selector]: selector => `${selector} :where(td, th)`,
        '--table-padding-x': '1.25em',
        '--table-padding-y': '1.25em',
    }],
    /**
     * Responsive variant.
     *
     * By using the `<{breakpoint}:table--responsive` class,
     * the table cells will be displayed as blocks when the
     * viewport width is below the breakpoint.
     *
     * Each cell in the body requires a `data-label` attribute
     * with the corresponding label/title, e.g.:
     *
     * <td data-label="Name:">John</td>
     *
     * Based on: https://css-tricks.com/responsive-data-tables/
     *
     * Be aware of accessibility concerns in current browsers
     * when using `display: block` in table elements:
     * https://adrianroselli.com/2018/02/tables-css-display-properties-and-aria.html
     */
    ['table--responsive', [
        { 'width': '100%' },
        {
            [symbols.selector]: selector => `${selector} :where(thead)`,
            [symbols.body]: '@copy .visually-hidden',
        },
        {
            [symbols.selector]: selector => `${selector} :where(tr)`,
            'border-bottom': '1px solid var(--table-color-border)',
            'display': 'block',
            'padding-bottom': '1em',
            'padding-top': '1em',
        },
        {
            [symbols.selector]: selector => `${selector} :where(tbody > tr:nth-child(even))`,
            'background-color': 'var(--color-gray-5, colorFallback("gray-5"))',
        },
        {
            [symbols.selector]: selector => `${selector} :where(td, th)`,
            'display': 'block',
        },
        {
            [symbols.selector]: selector => `${selector} :where(td)`,
            'border-bottom': 0,
            'padding': '0.5em 1em',
        },
        {
            [symbols.selector]: selector => `${selector} :where(td)::before`,
            'content': 'attr(data-label)',
            'display': 'block',
            'flex-shrink': 0,
            'font-size': '80%',
            'font-weight': 'var(--font-weight-bold)',
            'margin-right': '0.5rem',
            'padding-right': '0.5rem',
            'width': '100%',
        },
        {
            [symbols.selector]: selector => `${selector} :where(td):last-child`,
            'border-bottom': 0,
        },
    ]],
];
