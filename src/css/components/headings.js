const shared = {
    'font-family': 'var(--font-family-headings, inherit)',
    'font-weight': 'bold',
    'line-height': 1.3,
};

export const headings = [
    ['h1', {
        ...shared,
        'font-size': 'var(--font-size-h1)'
    }],
    ['h2', {
        ...shared,
        'font-size': 'var(--font-size-h2)'
    }],
    ['h3', {
        ...shared,
        'font-size': 'var(--font-size-h3)'
    }],
    ['h4', {
        ...shared,
        'font-size': 'var(--font-size-h4)'
    }],
    ['h5', shared],
    ['h6', shared],
];
