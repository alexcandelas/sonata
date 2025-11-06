const validBreakValues = ['all', 'auto', 'avoid', 'avoid-page', 'column', 'left', 'page', 'right'];

export const breaks = [
    [/^break-inside-(auto|avoid|avoid-page|avoid-column)$/, ([_, value]) => ({ 'break-inside': value })],
    [/^break-(before|after)-([a-z-]+)$/, ([_, direction, value]) => {
        if (validBreakValues.includes(value)) {
            return { [`break-${direction}`]: value };
        }
    }],
];
