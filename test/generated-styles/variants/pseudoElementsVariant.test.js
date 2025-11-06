import testUtility from '../../utils/testUtility.js';
import { it } from "vitest";

it.each([
    'after',
    'before',
    'backdrop',
    'placeholder',
])('generates pseudo elements (%s)', (pseudoElement) => {
    const source = pseudoElement + ':m-4';
    const expected = `.${pseudoElement}\\:m-4::${pseudoElement} { margin: 1rem; }`;

    testUtility(source, expected);
});

it.each([
    ['file', 'file-selector-button'],
])('generates pseudo elements with alias (%s)', async (pseudoElement, suffix) => {
    const source = pseudoElement + ':m-4';
    const expected = `.${pseudoElement}\\:m-4::${suffix} { margin: 1rem; }`;

    testUtility(source, expected);
});
