import { directionalDeclaration, numericDeclaration } from '../../utils/generated-styles/buildUtilityDeclarations.js';
import { directionsMap } from '../../utils/generated-styles/directionsMap.js';

const borderWidthDirections = directionsMap('border', 'width');

const radiusByDirection = {
    t: ['border-top-left-radius', 'border-top-right-radius'],
    r: ['border-top-right-radius', 'border-bottom-right-radius'],
    b: ['border-bottom-left-radius', 'border-bottom-right-radius'],
    l: ['border-top-left-radius', 'border-bottom-left-radius'],
};

function buildBorderColorDeclaration(propsByDirection, colorTokens) {
    return ([_, direction, token, opacity]) => {
        if (! Object.keys(colorTokens).includes(token)) return;

        const prop = direction ? propsByDirection[direction] : 'border-color';

        if (opacity) {
            return { [prop]: `color-mix(in oklab, var(--color-${token}) ${opacity}%, transparent)` };
        }

        return { [prop]: `var(--color-${token})` };
    };
}

export function borderColor(tokens) {
    const propsByDirection = directionsMap('border', 'color');

    return [
        [/^()b([xytrbl])?-transparent$/, directionalDeclaration('border-color', { propsByDirection, forcedValue: 'transparent' })],
        [/^()b([xytrbl])?-inherit$/, directionalDeclaration('border-color', { propsByDirection, forcedValue: 'inherit' })],
        [/^()b([xytrbl])?-current$/, directionalDeclaration('border-color', { propsByDirection, forcedValue: 'currentColor' })],
        [/^b([xytrbl])?-([\w-]+)(?:\/(\d{1,3}))?$/, buildBorderColorDeclaration(propsByDirection, tokens)],
    ];
}

export const borderWidth = [
    [/^()b-(\d+(?:\.\d+)?)([a-z]+|%)?$/, numericDeclaration('border-width')],
    [/^b-(\d+)?$/, ([_, size]) => Number(size) > 0 ? { 'border-width': size + 'px' } : null],
    [/^b-(\d+)?$/, ([_, size]) => Number(size) > 0 ? { 'border-width': size + 'px' } : null],
    [/^()b([trblxy])-(\d+(?:\.\d+)?)([a-z]+|%)?$/, directionalDeclaration('border-width', { propsByDirection: borderWidthDirections })],
    [/^b([trblxy])-(\d+)?$/, ([_, direction, size]) =>
        directionalDeclaration('border-width', { propsByDirection: borderWidthDirections })([_, '', direction, size, 'px'])
    ],
];

export function radius(tokens) {
    const options = { cssVariable: 'radius', tokens, propsByDirection: radiusByDirection };

    return [
        [/^()radius(?:-([trbl]))?-(\d+(?:\.\d+)?)([a-z]+|%)?$/, directionalDeclaration('border-radius', options)],
        [/^()radius(?:-([trbl]))?$/, directionalDeclaration('border-radius', options)],
        [/^()radius(?:-([trbl]))?-([\w-]+)$/, directionalDeclaration('border-radius', options)],
        [/^radius(?:-([trbl]))?-full$/, ([_, direction]) => directionalDeclaration('border-radius', options)([undefined, '', direction, '9999', 'px'])],
    ];
}
