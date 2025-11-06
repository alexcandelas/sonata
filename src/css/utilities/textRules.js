import { directionalDeclaration, numericDeclaration, tokenDeclaration } from '../../utils/generated-styles/buildUtilityDeclarations.js';

export function letterSpacing(tokens) {
    return [
        [/^ls$/, tokenDeclaration('letter-spacing', { tokens })],
        [/^(-?)ls-(\d+(?:\.\d+)?)([a-z]+|%)?$/, numericDeclaration('letter-spacing')],
        [/^(-?)ls-([\w-]+)$/, ([_, negative, token]) => directionalDeclaration('letter-spacing', {
            tokens,
            resolveNumeric: false
        })([undefined, negative, undefined, token])],
    ];
}

export function lineHeight(tokens) {
    return [
        [/^()lh-(\d+(?:\.\d+)?)([a-z]+|%)?$/, numericDeclaration('line-height', { unitlessToRems: false })],
        [/^lh(?:-([\w-]+))?$/, tokenDeclaration('line-height', { tokens })],
    ];
}

export const textAlign = [
    ['text-start', { 'text-align': 'start' }],
    ['text-end', { 'text-align': 'end' }],
    ['text-left', { 'text-align': 'left' }],
    ['text-right', { 'text-align': 'right' }],
    ['text-center', { 'text-align': 'center' }],
    ['text-justify', { 'text-align': 'justify' }],
];

export const textTransform = [
    ['normal-case', { 'text-transform': 'none' }],
    ['capitalize', { 'text-transform': 'capitalize' }],
    ['uppercase', { 'text-transform': 'uppercase' }],
    ['lowercase', { 'text-transform': 'lowercase' }],
];

export const verticalAlign = [
    ['align-baseline', { 'vertical-align': 'baseline' }],
    ['align-sub', { 'vertical-align': 'sub' }],
    ['align-super', { 'vertical-align': 'super' }],
    ['align-text-top', { 'vertical-align': 'text-top' }],
    ['align-text-bottom', { 'vertical-align': 'text-bottom' }],
    ['align-middle', { 'vertical-align': 'middle' }],
    ['align-top', { 'vertical-align': 'top' }],
    ['align-bottom', { 'vertical-align': 'bottom' }],
];

export const whiteSpace = [
    ['whitespace-normal', { 'whitespace': 'normal' }],
    ['whitespace-pre', { 'whitespace': 'pre' }],
    ['whitespace-pre-wrap', { 'whitespace': 'pre-wrap' }],
    ['whitespace-pre-line', { 'whitespace': 'pre-line' }],
    ['whitespace-nowrap', { 'whitespace': 'nowrap' }],
    ['whitespace-break-spaces', { 'whitespace': 'break-spaces' }],
];
