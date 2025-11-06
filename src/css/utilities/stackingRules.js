export const isolation = [
    ['isolate', { isolation: 'isolate' }],
    ['isolation-auto', { isolation: 'auto' }],
];

export const zIndex = [
    ['z-auto', { 'z-index': 'auto' }],
    [/^(-?)z-(\d+)$/, ([_, negative = '', level]) => {
        if (negative && level === '0') return;

        return { 'z-index': negative + level };
    }],
];
