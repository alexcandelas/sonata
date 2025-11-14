import { directionalDeclaration, numericDeclaration } from '../../utils/generated-styles/buildUtilityDeclarations.js';
import { resolveNumericValue } from '../../utils/generated-styles/resolveNumericValue.js';
import { symbols } from 'unocss';
import { directionsMap } from '../../utils/index.js';

const marginDirections = directionsMap('margin', '', true);
const paddingDirections = directionsMap('padding', '', true);

function buildSpaceDeclarations([_, negative, direction, size, unit = '']) {
    const value = resolveNumericValue(negative, size, unit);

    if (value === undefined) return;

    const property = direction === 'x' ? 'inline' : 'block';

    return {
        [symbols.selector]: selector => `${selector} > :not(:last-child)`,
        [`margin-${property}-start`]: 0,
        [`margin-${property}-end`]: value,
    };
}

function resolveContainerValue(negative) {
    return negative
        ? 'calc(var(--container-padding) * -1)'
        : 'var(--container-padding)';
}

export const margin = [
    [/^(-?)m-(\d+(?:\.\d+)?)([a-z]+|%)?$/, numericDeclaration('margin')],
    [/^(-?)m-(\d+\/\d+)$/, numericDeclaration('margin')],
    [/^(-?)m([trblxy]|[bi][se])-(\d+(?:\.\d+)?)([a-z]+|%)?$/, directionalDeclaration('margin', { propsByDirection: marginDirections })],
    [/^(-?)m([trblxy]|[bi][se])-(\d+\/\d+)$/, directionalDeclaration('margin', { propsByDirection: marginDirections })],
    ['m-auto', { margin: 'auto' }],
    [/^m([trblxy]|[bi][se])-auto$/, ([_, direction]) =>
        directionalDeclaration(
            'margin',
            { propsByDirection: marginDirections, forcedValue: 'auto' }
        )([_, '', direction])
    ],
    [/^(-?)m-container$/, ([_, negative]) => ({ margin: resolveContainerValue(negative) })],
    [/^(-?)m([trblxy]|[bi][se])-container$/, ([_, negative, direction]) =>
        directionalDeclaration(
            'margin',
            { propsByDirection: marginDirections, forcedValue: resolveContainerValue(negative) }
        )([_, '', direction])
    ],
];

export const padding = [
    [/^(-?)p-(\d+(?:\.\d+)?)([a-z%]+)?$/, numericDeclaration('padding')],
    [/^(-?)p([trblxy]|[bi][se])-(\d+(?:\.\d+)?)([a-z%]+)?$/, directionalDeclaration('padding', { propsByDirection: paddingDirections })],
    [/^(-?)p-container$/, ([_, negative]) => ({ padding: resolveContainerValue(negative) })],
    [/^(-?)p([trblxy]|[bi][se])-container$/, ([_, negative, direction]) =>
        directionalDeclaration(
            'padding',
            { propsByDirection: paddingDirections, forcedValue: resolveContainerValue(negative) }
        )([_, '', direction])
    ],
];

export const space = [
    [/^(-?)space-([x|y])-(\d+)$/, buildSpaceDeclarations],
    [/^(-?)space-([x|y])-(\d+(?:\.\d+)?)([a-z]+)$/, buildSpaceDeclarations],
];
