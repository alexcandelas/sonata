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
    ['d-iblock', { display: 'inline-block' }],
    ['d-iflex', { display: 'inline-flex' }],
    ['d-igrid', { display: 'inline-grid' }],
    ['d-itable', { display: 'inline-table' }],
    ['hidden', { display: 'none' }],
    [/^d-([\w-]+)$/, ([_, value]) => {
        if (displayValues.includes(value)) {
            return { display: value };
        }
    }]
];
