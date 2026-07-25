function resolve(property, colors) {
    return ([_, colorKey, opacity = '']) => {
        if (colorKey === 'current') {
            return {
                [property]: applyOpacity('currentColor', opacity)
            };
        }

        const colorVariable = `var(--color-${colorKey})`;

        if ((colors[colorKey] && opacity === '') || colors[colorKey + '/' + opacity]) {
            return {
                [property]: colorVariable
            };
        }

        if (opacity === '') return;

        return {
            [property]: applyOpacity(colorVariable, opacity)
        };
    };
}

function applyOpacity(color, opacity) {
    if (opacity === '') return color;

    return `color-mix(in oklab, ${color} ${opacity}%, transparent)`;
}

export function color(tokens) {
    return [
        ['c-transparent', { color: 'transparent' }],
        [/^c-([\w-]+)(?:\/(\d{1,3}))?$/, resolve('color', tokens)],
    ];
}

export function backgroundColor(tokens) {
    return [
        ['bg-transparent', { 'background-color': 'transparent' }],
        [/^bg-([\w-]+)(?:\/(\d{1,3}))?$/, resolve('background-color', tokens)]
    ];
}
