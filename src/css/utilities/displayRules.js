const displayValues = [
    'block',
    'inline-block',
    'flex',
    'inline-flex',
    'grid',
    'inline-grid',
    'contents',
    'flow-root',
    'inline',
    'list-item',
    'none',
    'table',
    'inline-table',
    'table-row',
    'table-caption',
    'table-cell',
    'table-column',
    'table-column-group',
    'table-footer-group',
    'table-header-group',
    'table-row-group',
];

export const display = [
    ['hidden', { display: 'none' }],
    [/^d-([\w-]+)$/, ([_, value]) => {
        if (displayValues.includes(value)) {
            return { display: value };
        }
    }]
];
