import { directionalDeclaration, numericDeclaration } from '../../utils/generated-styles/buildUtilityDeclarations.js';

const propsByDirection = {
    x: ['column-gap'],
    y: ['row-gap'],
};

export const gap = [
    [/^()gap-(\d+(?:\.\d+)?)([a-z]+|%)?$/, numericDeclaration('gap')],
    [/^()gap-([x|y])-(\d+(?:\.\d+)?)([a-z]+|%)?$/, directionalDeclaration('gap', { propsByDirection })],
];
