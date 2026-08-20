import { directionalDeclaration, numericDeclaration } from '../../utils/generated-styles/buildUtilityDeclarations.js';

const positionValues = ['static', 'relative', 'absolute', 'fixed', 'sticky'];

const insetDirections = {
    x: ['left', 'right'],
    y: ['bottom', 'top'],
    bs: ['inset-block-start'],
    be: ['inset-block-end'],
    is: ['inset-inline-start'],
    ie: ['inset-inline-end'],
    block: ['inset-block'],
    inline: ['inset-inline'],
};

export const position = positionValues.map(value => [value, { position: value }]);

export const inset = [
    [/^(inset|top|right|bottom|left)-auto$/, ([_, position]) => ({ [position]: 'auto' })],
    [/^(-?)(inset|top|right|bottom|left)-(\d+(?:\.\d+)?)([a-z]+|%)?$/, ([_, negative = '', position, size, unit]) => {
        return numericDeclaration(position)([undefined, negative, size, unit]);
    }],
    [/^()inset-(x|y|inline|block)-(auto)$/, directionalDeclaration('inset', { propsByDirection: insetDirections })],
    [/^(-?)inset-(y|x|inline|block|[bi][se])-(\d+(?:\.\d+)?)([a-z]+|%)?$/, directionalDeclaration('inset', { propsByDirection: insetDirections })],
];

export const align = [
    // align-content
    ['content-normal', { 'align-content': 'normal' }],
    ['content-stretch', { 'align-content': 'stretch' }],
    ['content-baseline', { 'align-content': 'baseline' }],
    ['content-center', { 'align-content': 'center' }],
    ['content-start', { 'align-content': 'flex-start' }],
    ['content-end', { 'align-content': 'flex-end' }],
    ['content-between', { 'align-content': 'flex-space-between' }],
    ['content-around', { 'align-content': 'flex-space-around' }],
    ['content-evenly', { 'align-content': 'flex-space-evenly' }],

    // align-items
    ['items-stretch', { 'align-items': 'stretch' }],
    ['items-baseline', { 'align-items': 'baseline' }],
    ['items-center', { 'align-items': 'center' }],
    ['items-start', { 'align-items': 'flex-start' }],
    ['items-end', { 'align-items': 'flex-end' }],

    // align-self
    ['self-auto', { 'align-self': 'auto' }],
    ['self-stretch', { 'align-self': 'stretch' }],
    ['self-baseline', { 'align-self': 'baseline' }],
    ['self-center', { 'align-self': 'center' }],
    ['self-start', { 'align-self': 'flex-start' }],
    ['self-end', { 'align-self': 'flex-end' }],
];

export const justify = [
    // justify-content
    ['justify-normal', { 'justify-content': 'normal' }],
    ['justify-stretch', { 'justify-content': 'stretch' }],
    ['justify-center', { 'justify-content': 'center' }],
    ['justify-start', { 'justify-content': 'flex-start' }],
    ['justify-end', { 'justify-content': 'flex-end' }],
    ['justify-between', { 'justify-content': 'space-between' }],
    ['justify-around', { 'justify-content': 'space-around' }],
    ['justify-evenly', { 'justify-content': 'space-evenly' }],

    // justify-items
    ['justify-items-normal', { 'justify-items': 'normal' }],
    ['justify-items-stretch', { 'justify-items': 'stretch' }],
    ['justify-items-center', { 'justify-items': 'center' }],
    ['justify-items-start', { 'justify-items': 'start' }],
    ['justify-items-end', { 'justify-items': 'end' }],
    ['justify-items-left', { 'justify-items': 'left' }],
    ['justify-items-right', { 'justify-items': 'right' }],

    // justify-self
    ['justify-self-auto', { 'justify-self': 'auto' }],
    ['justify-self-stretch', { 'justify-self': 'stretch' }],
    ['justify-self-center', { 'justify-self': 'center' }],
    ['justify-self-start', { 'justify-self': 'start' }],
    ['justify-self-end', { 'justify-self': 'end' }],
    ['justify-self-left', { 'justify-self': 'left' }],
    ['justify-self-right', { 'justify-self': 'right' }],
];

export const place = [
    // place-contents
    ['place-content-stretch', { 'place-content': 'stretch' }],
    ['place-content-center', { 'place-content': 'center' }],
    ['place-content-start', { 'place-content': 'start' }],
    ['place-content-end', { 'place-content': 'end' }],
    ['place-content-between', { 'place-content': 'space-between' }],
    ['place-content-around', { 'place-content': 'space-around' }],
    ['place-content-evenly', { 'place-content': 'space-evenly' }],

    // place-items
    ['place-items-stretch', { 'place-items': 'stretch' }],
    ['place-items-center', { 'place-items': 'center' }],
    ['place-items-start', { 'place-items': 'start' }],
    ['place-items-end', { 'place-items': 'end' }],

    // place-self
    ['place-self-auto', { 'place-self': 'auto' }],
    ['place-self-stretch', { 'place-self': 'stretch' }],
    ['place-self-center', { 'place-self': 'center' }],
    ['place-self-start', { 'place-self': 'start' }],
    ['place-self-end', { 'place-self': 'end' }],

    // place shorthand
    ['place-stretch', {
        'place-content': 'stretch',
        'place-items': 'stretch',
    }],
    ['place-center', {
        'place-content': 'center',
        'place-items': 'center',
    }],
    ['place-start', {
        'place-content': 'start',
        'place-items': 'start',
    }],
    ['place-end', {
        'place-content': 'end',
        'place-items': 'end',
    }],
];
