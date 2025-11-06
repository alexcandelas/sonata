import { tokenDeclaration } from '../../utils/generated-styles/buildUtilityDeclarations.js';

export function fill(tokens) {
    return [
        [/^fill-([\w-]+)$/, tokenDeclaration('fill', { tokens, cssVariable: 'color' })],
        ['fill-inherit', { fill: 'inherit' }],
        ['fill-current', { fill: 'currentColor' }],
        ['fill-none', { fill: 'none' }],
        ['fill-transparent', { fill: 'transparent' }],
    ];
}

export function stroke(tokens) {
    return [
        [/^stroke-([\w-]+)$/, tokenDeclaration('stroke', { tokens, cssVariable: 'color' })],
        ['stroke-inherit', { stroke: 'inherit' }],
        ['stroke-current', { stroke: 'currentColor' }],
        ['stroke-none', { stroke: 'none' }],
        ['stroke-transparent', { stroke: 'transparent' }],
    ];
}

export const strokeWidth = [
    [/^stroke-(\d+(?:.\d+)?)$/, ([_, value]) => ({ 'stroke-width': value })],
];
