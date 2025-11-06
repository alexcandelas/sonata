export const overflow = [
    [/^overflow(-[xy])?-visible$/, ([_, direction = '']) => ({ [`overflow${direction}`]: 'visible' })],
    [/^overflow(-[xy])?-auto$/, ([_, direction = '']) => ({ [`overflow${direction}`]: 'auto' })],
    [/^overflow(-[xy])?-clip$/, ([_, direction = '']) => ({ [`overflow${direction}`]: 'clip' })],
    [/^overflow(-[xy])?-hidden$/, ([_, direction = '']) => ({ [`overflow${direction}`]: 'hidden' })],
    [/^overflow(-[xy])?-scroll$/, ([_, direction = '']) => ({ [`overflow${direction}`]: 'scroll' })],
];
