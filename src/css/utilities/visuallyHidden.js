const visuallyHiddenProps = {
    'border': '0',
    'clip': 'rect(0, 0, 0, 0)',
    'height': '1px',
    'margin': '-1px',
    'overflow': 'hidden',
    'padding': '0',
    'position': 'absolute',
    'white-space': 'nowrap',
    'width': '1px',
};

export const visuallyHidden = [
    ['visually-hidden', visuallyHiddenProps],
    [/^visually-hidden-focusable$/, ([], { symbols }) => ({
        [symbols.selector]: selector => `${selector}:where(:not(:active):not(:focus):not(:focus-within))`,
        ...visuallyHiddenProps,
    })],
    ['not-visually-hidden', {
        'clip': 'auto',
        'height': 'auto',
        'margin': '0',
        'overflow': 'visible',
        'position': 'static',
        'white-space': 'inherit',
        'width': 'auto',
    }],
];
