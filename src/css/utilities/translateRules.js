import { resolveNumericValue } from '../../utils/generated-styles/resolveNumericValue.js';

function buildDeclaration([_, negative = '', direction, size, unit = '']) {
    const value = resolveNumericValue(negative, size, unit);

    if (value === undefined) return;

    const result = direction
        ? { [`--sonata-translate-${direction}`]: value }
        : { '--sonata-translate-x': value, '--sonata-translate-y': value };

    result.translate = 'var(--sonata-translate-x, 0) var(--sonata-translate-y, 0)';

    if (direction === 'z') {
        result.translate += ' var(--sonata-translate-z, 0)';
    }

    return result;
}

export const translate = [
    ['translate-none', { translate: 'none' }],
    ['translate-full', {
        '--sonata-translate-x': '100%',
        '--sonata-translate-y': '100%',
        'translate': 'var(--sonata-translate-x, 0) var(--sonata-translate-y, 0)'
    }],
    [/^(-?)translate-(?:([xyz])-)?(\d+(?:\.\d+)?)([a-z]+|%)?$/, buildDeclaration],
    [/^(-?)translate-(?:([xyz])-)?(\d+\/\d+)?$/, buildDeclaration],
];
