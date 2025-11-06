import lengthUnits from '../../config/lengthUnits.js';
import { directionalDeclaration } from '../../utils/generated-styles/buildUtilityDeclarations.js';

const gridAutoDirections = {
    rows: ['grid-auto-rows'],
    cols: ['grid-auto-columns']
};

function colToColumn(direction) {
    return direction.replace('col', 'column');
}

export const gridTemplate = [
    ['grid-cols-auto', { 'grid-template-columns': 'repeat(auto-fit, minmax(0, 1fr))' }],
    [/^grid-(rows|cols)-none$/, ([_, direction]) => ({ [`grid-template-${colToColumn(direction)}`]: 'none' })],
    [/^grid-(rows|cols)-subgrid$/, ([_, direction]) => ({ [`grid-template-${colToColumn(direction)}`]: 'subgrid' })],
    [/^grid-(rows|cols)-(\d+)$/, ([_, direction, count]) => ({ [`grid-template-${colToColumn(direction)}`]: `repeat(${count}, minmax(0, 1fr))` })],
    [/^grid-(rows|cols)-(\d+(?:\.\d+)?)([a-z]+|%)?$/, ([_, direction, length, unit]) => {
        if (lengthUnits.includes(unit)) {
            return { [`grid-template-${colToColumn(direction)}`]: `repeat(${length}${unit}, minmax(0, 1fr))` };
        }
    }],
];

export const gridSize = [
    [/^(row|col)-auto$/, ([_, direction]) => ({ [`grid-${colToColumn(direction)}`]: 'auto' })],
    [/^(-?)(row|col)-(\d+)$/, ([_, negative = '', direction, start]) => {
        if (Number(start) > 0) {
            return { [`grid-${colToColumn(direction)}`]: `${negative}${start}` };
        }
    }],
    [/^(row|col)-span-full$/, ([_, direction]) => ({ [`grid-${colToColumn(direction)}`]: '1 / -1' })],
    [/^(row|col)-span-(\d+)$/, ([_, direction, size]) => {
        if (size !== '0') {
            return { [`grid-${colToColumn(direction)}`]: `span ${size} / span ${size}` };
        }
    }],
    [/^(row|col)-(start|end)-auto$/, ([_, direction, position]) => ({ [`grid-${colToColumn(direction)}-${position}`]: 'auto' })],
    [/^(-?)(row|col)-(start|end)-(\d+)$/, ([_, negative = '', direction, position, size]) => {
        if (size !== '0') {
            return { [`grid-${colToColumn(direction)}-${position}`]: `${negative}${size}` };
        }
    }],
];

export const gridAuto = [
    // auto-flow
    ['grid-flow-row', { 'grid-auto-flow': 'row' }],
    ['grid-flow-col', { 'grid-auto-flow': 'column' }],
    ['grid-flow-dense', { 'grid-auto-flow': 'dense' }],
    ['grid-flow-row-dense', { 'grid-auto-flow': 'row dense' }],
    ['grid-flow-col-dense', { 'grid-auto-flow': 'column dense' }],

    // auto-rows/auto-columns
    [/^auto-(rows|cols)-auto$/, ([_, direction]) => ({ [`grid-auto-${colToColumn(direction)}`]: 'auto' })],
    [/^auto-(rows|cols)-min$/, ([_, direction]) => ({ [`grid-auto-${colToColumn(direction)}`]: 'min-content' })],
    [/^auto-(rows|cols)-max$/, ([_, direction]) => ({ [`grid-auto-${colToColumn(direction)}`]: 'max-content' })],
    [/^auto-(rows|cols)-fr$/, ([_, direction]) => ({ [`grid-auto-${colToColumn(direction)}`]: 'minmax(0, 1fr)' })],
    [/^()auto-(rows|cols)-(\d+(?:\.\d+)?)([a-z]+|%)?$/, directionalDeclaration('grid-auto', { propsByDirection: gridAutoDirections })],
];
