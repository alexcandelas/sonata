export const ratio = [
    ['ratio-auto', { 'aspect-ratio': 'auto' }],
    [/^ratio-(1|square)$/, () => ({ 'aspect-ratio': '1/1' })],
    [/^ratio-(\d+)\/(\d+)/, ([_, width, height]) => ({ 'aspect-ratio': `${width}/${height}` })],
];
