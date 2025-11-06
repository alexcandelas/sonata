import lengthUnits from '../../config/lengthUnits.js';

export const columns = [
    ['columns-auto', { columns: 'auto' }],
    [/^columns-(\d+)$/, ([_, value]) => {
        value = Number(value);

        if (value > 0) {
            return { columns: value };
        }
    }],
    [/^columns-(\d+(?:\.\d+)?)([a-z]+)$/, ([_, value, unit = '']) => {
        value = Number(value);

        if (value > 0 && lengthUnits.includes(unit)) {
            return { columns: value + unit };
        }
    }],
];
