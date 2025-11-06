export const order = [
    ['order-first', { order: -9999 }],
    ['order-last', { order: 9999 }],
    [/^(-?)order-(\d+)$/, ([_, negative = '', value]) => ({ order: `${negative}${value}` })],
];
