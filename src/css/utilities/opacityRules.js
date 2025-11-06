export const opacity = [
    [/^opacity-(\d+)$/, ([, value]) => {
        value = Number(value);

        if (value >= 0 && value <= 100) {
            return { opacity: value / 100 };
        }
    }]
];
