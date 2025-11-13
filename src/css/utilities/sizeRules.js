import { resolveNumericValue } from '../../utils/generated-styles/resolveNumericValue.js';

function buildDeclaration(property) {
    return ([_, prefix = '', size, unit = '']) => {
        const value = resolveNumericValue('', size, unit);

        if (value !== undefined) {
            return { [`${prefix}${property}`]: value };
        }
    }
}

export const height = [
    ['max-h-none', { 'max-height': 'none' }],
    [/^(min-|max-)?h-auto$/, ([_, prefix = '']) => ({ [`${prefix}height`]: 'auto' })],
    [/^(min-|max-)?h-(max|min|fit)$/, ([_, prefix = '', property]) => ({ [`${prefix}height`]: `${property}-content` })],
    [/^(min-|max-)?h-full$/, ([_, prefix = '']) => ({ [`${prefix}height`]: '100%' })],
    [/^(min-|max-)?h-screen$/, ([_, prefix = '']) => ({ [`${prefix}height`]: '100vh' })],
    [/^(min-|max-)?h-(\d+\/\d+)$/, buildDeclaration('height')],
    [/^(min-|max-)?h-(\d+(?:\.\d+)?)([a-z]+|%)?$/, buildDeclaration('height')],
];

export const width = [
    ['max-w-none', { 'max-width': 'none' }],
    [/^(min-|max-)?w-auto$/, ([_, prefix = '']) => ({ [`${prefix}width`]: 'auto' })],
    [/^(min-|max-)?w-(max|min|fit)$/, ([_, prefix = '', property]) => ({ [`${prefix}width`]: `${property}-content` })],
    [/^(min-|max-)?w-full$/, ([_, prefix = '']) => ({ [`${prefix}width`]: '100%' })],
    [/^(min-|max-)?w-screen$/, ([_, prefix = '']) => ({ [`${prefix}width`]: '100vw' })],
    [/^(min-|max-)?w-(\d+\/\d+)$/, buildDeclaration('width')],
    [/^(min-|max-)?w-(\d+(?:\.\d+)?)([a-z]+|%)?$/, buildDeclaration('width')],
];
