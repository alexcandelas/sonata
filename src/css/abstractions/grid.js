export const row = [
    ['row/auto', {
        'column-gap': 'var(--gutter)',
        'display': 'grid',
        'grid-template-columns': 'repeat(auto-fit, minmax(0, 1fr))',
    }],
    [/^row(?:\/(\d+))?$/, ([_, columns = 1]) => {
        return {
            '--grid-columns': columns,
            'column-gap': 'var(--gutter)',
            'display': 'grid',
            'grid-template-columns': columns === 1 ? '1fr' : 'repeat(var(--grid-columns), 1fr)',
        };
    }],
];

export const col = [
    ['col', { 'grid-column-end': 'span var(--grid-columns)' }],
    [/^col-(\d+\/\d+)$/, ([_, fraction]) => ({
        'grid-column-end': `span calc(var(--grid-columns) * ${fraction})`,
    })],
];
