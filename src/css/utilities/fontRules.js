import { numericDeclaration, tokenDeclaration } from '../../utils/generated-styles/buildUtilityDeclarations.js';

export function fontFamily(tokens) {
    return [
        [/^ff$/, tokenDeclaration('font-family', { tokens })],
        [/^ff-([\w-]+)$/, tokenDeclaration('font-family', { tokens })],
    ];
}

export function fontSize(tokens) {
    return [
        [/^fs$/, tokenDeclaration('font-size', { tokens })],
        [/^()fs-(\d+(?:\.\d+)?)([a-z]+|%)?$/, numericDeclaration('font-size')],
        [/^fs-([\w-]+)$/, tokenDeclaration('font-size', { tokens })],
    ];
}

export function fontWeight(tokens) {
    return [
        [/^fw$/, tokenDeclaration('font-weight', { tokens })],
        [/^()fw-(\d+)$/, numericDeclaration('font-weight', { unitlessToRems: false })],
        [/^fw-([\w-]+)$/, tokenDeclaration('font-weight', { tokens })],
    ];
}
