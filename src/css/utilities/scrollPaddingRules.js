import { directionalDeclaration, numericDeclaration } from '../../utils/generated-styles/buildUtilityDeclarations.js';
import { directionsMap } from '../../utils/index.js';

const propsByDirection = directionsMap('scroll-padding', '', true);

export const scrollPadding = [
    [/^(-?)scroll-p-(\d+(?:\.\d+)?)([a-z]+|%)?$/, numericDeclaration('scroll-padding')],
    [/^(-?)scroll-p([trblxy]|[bi][se])-(\d+(?:\.\d+)?)([a-z]+|%)?$/, directionalDeclaration('padding', { propsByDirection })],
];
