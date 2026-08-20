import lengthUnits from '../../config/lengthUnits.js';
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

export function textDecoration(tokens) {
    return [
        [/^decoration-([\w-]+)$/, tokenDeclaration('text-decoration-color', { tokens, cssVariable: 'color' })],
        ['decoration-current', { 'text-decoration-color': 'currentColor' }],
        ['decoration-inherit', { 'text-decoration-color': 'inherit' }],
        ['decoration-transparent', { 'text-decoration-color': 'transparent' }],
        ['underline', { 'text-decoration-line': 'underline' }],
        ['overline', { 'text-decoration-line': 'overline' }],
        ['line-through', { 'text-decoration-line': 'line-through' }],
        ['line-through', { 'text-decoration-line': 'line-through' }],
        ['decoration-none', { 'text-decoration-line': 'none' }],
        ['decoration-solid', { 'text-decoration-style': 'solid' }],
        ['decoration-double', { 'text-decoration-style': 'double' }],
        ['decoration-dotted', { 'text-decoration-style': 'dotted' }],
        ['decoration-dashed', { 'text-decoration-style': 'dashed' }],
        ['decoration-wavy', { 'text-decoration-style': 'wavy' }],
        ['decoration-auto', { 'text-decoration-thickness': 'auto' }],
        ['decoration-from-font', { 'text-decoration-thickness': 'from-font' }],
        [/^decoration-(\d+)$/, ([_, value]) => ({ 'text-decoration-thickness': value === '0' ? '0' : `${value}px` })],
    ];
}

export const textTransform = [
    ['normal-case', { 'text-transform': 'none' }],
    ['capitalize', { 'text-transform': 'capitalize' }],
    ['uppercase', { 'text-transform': 'uppercase' }],
    ['lowercase', { 'text-transform': 'lowercase' }],
];

export const textUnderlineOffset = [
    ['underline-offset-auto', { 'text-underline-offset': 'auto' }],
    [/^(-?)underline-offset-(\d+(?:\.\d+)?)([a-z]+|%)?$/, ([_, negative = '', value, unit = '']) => {
        value = Number(value);

        if (value === 0) return { 'text-underline-offset': 0 };

        if (unit === '') return { 'text-underline-offset': `${negative}${value}px` };

        if (lengthUnits.includes(unit)) {
            return { 'text-underline-offset': `${negative}${value}${unit}` };
        }
    }],
];

export const textWrap = [
    ['text-wrap', { 'text-wrap': 'wrap' }],
    ['text-nowrap', { 'text-wrap': 'nowrap' }],
    ['text-balance', { 'text-wrap': 'balance' }],
    ['text-pretty', { 'text-wrap': 'pretty' }],
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
    ['whitespace-normal', { 'white-space': 'normal' }],
    ['whitespace-pre', { 'white-space': 'pre' }],
    ['whitespace-pre-wrap', { 'white-space': 'pre-wrap' }],
    ['whitespace-pre-line', { 'white-space': 'pre-line' }],
    ['whitespace-nowrap', { 'white-space': 'nowrap' }],
    ['whitespace-break-spaces', { 'white-space': 'break-spaces' }],
];
