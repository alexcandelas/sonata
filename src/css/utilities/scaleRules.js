export const scale = [
    ['scale-none', { 'scale': 'none' }],
    [/^(-?)scale-(\d+)$/, ([_, negative = '', value]) => {
        value = Number(value) / 100;

        return {
            '--sonata-scale-x': `${negative}${value}`,
            '--sonata-scale-y': `${negative}${value}`,
            'scale': 'var(--sonata-scale-x, 1) var(--sonata-scale-y, 1)',
        };
    }],
    [/^(-?)scale-([xy])-(\d+)$/, ([_, negative = '', axis, value]) => {
        value = Number(value) / 100;

        return {
            [`--sonata-scale-${axis}`]: `${negative}${value}`,
            'scale': 'var(--sonata-scale-x, 1) var(--sonata-scale-y, 1)',
        };
    }],
];
