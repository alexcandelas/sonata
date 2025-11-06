function resolve(property, colors) {
    return ([_, colorKey, opacity = '']) => {
        if ((colors[colorKey] && opacity === '') || colors[colorKey + '/' + opacity]) {
            return {
                [property]: `var(--color-${colorKey})`
            };
        }

        if (opacity === '') return;

        return {
            [property]: `color-mix(in srgb, var(--color-${colorKey}) ${opacity}%, transparent)`
        };
    };
}

export function color(tokens) {
    return [
        ['c-current', { color: 'currentColor' }],
        ['c-transparent', { color: 'transparent' }],
        [/^c-([\w-]+)(?:\/(\d{1,3}))?$/, resolve('color', tokens)]
    ];
}

export function backgroundColor(tokens) {
    return [
        ['bg-current', { 'background-color': 'currentColor' }],
        ['bg-transparent', { 'background-color': 'transparent' }],
        [/^bg-([\w-]+)(?:\/(\d{1,3}))?$/, resolve('background-color', tokens)]
    ];
}
