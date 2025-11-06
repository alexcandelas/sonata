import { numericDeclaration } from '../../utils/generated-styles/buildUtilityDeclarations.js';

export const flex = [
    ['flex-initial', { flex: 'initial' }],
    ['flex-auto', { flex: 'auto' }],
    ['flex-none', { flex: 'none' }],
    [/^flex-(\d+)$/, ([_, size]) => ({ flex: `${size} 1 0` })],
];

export const flexBasis = [
    ['flex-basis-auto', { 'flex-basis': 'auto' }],
    ['flex-basis-content', { 'flex-basis': 'content' }],
    ['flex-basis-max', { 'flex-basis': 'max-content' }],
    ['flex-basis-min', { 'flex-basis': 'min-content' }],
    ['flex-basis-fit', { 'flex-basis': 'fit-content' }],
    ['flex-basis-full', { 'flex-basis': '100%' }],
    [/^()flex-basis-(\d+(?:\.\d+)?)([a-z]+|%)?$/, numericDeclaration('flex-basis')],
];

export const flexDirection = [
    ['flex-row', { 'flex-direction': 'row' }],
    ['flex-row-reverse', { 'flex-direction': 'row-reverse' }],
    ['flex-col', { 'flex-direction': 'column' }],
    ['flex-col-reverse', { 'flex-direction': 'column-reverse' }],
];

export const flexGrow = [
    [/^flex-grow-(\d+(?:\.\d+)?)$/, ([_, size]) => ({ 'flex-grow': size })],
];

export const flexShrink = [
    [/^flex-shrink-(\d+)$/, ([_, size]) => ({ 'flex-shrink': size })],
];

export const flexWrap = [
    ['flex-nowrap', { 'flex-wrap': 'nowrap' }],
    ['flex-wrap', { 'flex-wrap': 'wrap' }],
    ['flex-wrap-reverse', { 'flex-wrap': 'wrap-reverse' }],
];
