export const container = [
    ['@container', { 'container-type': 'inline-size' }],
    [/^@container\/([\w-]+)$/, ([_, name]) => ({
        'container-name': name,
        'container-type': 'inline-size',
    })],
];
