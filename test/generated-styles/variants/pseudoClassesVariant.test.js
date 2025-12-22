import testUtility from '../../utils/testUtility.js';
import { it } from "vitest";

it.each([
    'autofill',
    'enabled',
    'disabled',
    'placeholder-shown',
    'default',
    'checked',
    'indeterminate',
    'valid',
    'invalid',
    'in-range',
    'out-of-range',
    'required',
    'optional',
    'user-valid',
    'user-invalid',
    'empty',
    'first-of-type',
    'last-of-type',
    'active',
    'focus',
    'focus-visible',
    'focus-within',
    ['first', 'first-child'],
    ['last', 'last-child'],
    ['even', 'nth-child(even)'],
    ['odd', 'nth-child(odd)']
])('generates pseudo classes (%s)', (pseudoClass) => {
    const isString = typeof pseudoClass === 'string';
    const prefix = isString ? pseudoClass : pseudoClass[0];
    pseudoClass = isString ? pseudoClass : pseudoClass[1];

    const source = prefix + ':m-4';
    const expected = `.${prefix}\\:m-4:${pseudoClass} { margin: 1rem; }`;

    return testUtility(source, expected);
});

it('generates `hover` pseudo class inside a media query', () => {
    const source = 'hover:m-4';
    const expected = `@media (hover: hover) { .hover\\:m-4:hover { margin: 1rem } }`;

    return testUtility(source, expected);
});

it.each([
    'autofill',
    'enabled',
    'disabled',
    'placeholder-shown',
    'default',
    'checked',
    'indeterminate',
    'valid',
    'invalid',
    'in-range',
    'out-of-range',
    'required',
    'optional',
    'user-valid',
    'user-invalid',
    'empty',
    'first-of-type',
    'last-of-type',
    'active',
    'focus',
    'focus-visible',
    'focus-within',
    ['first', 'first-child'],
    ['last', 'last-child'],
    ['even', 'nth-child(even)'],
    ['odd', 'nth-child(odd)']
])('negates pseudo classes (%s)', (pseudoClass) => {
    const isString = typeof pseudoClass === 'string';
    const prefix = isString ? pseudoClass : pseudoClass[0];
    pseudoClass = isString ? pseudoClass : pseudoClass[1];

    const source = `not-${prefix}:m-4`;
    const expected = `.not-${prefix}\\:m-4:not(:${pseudoClass}) { margin: 1rem; }`;

    return testUtility(source, expected);
});

it('negates `hover` pseudo class', () => {
    const source = 'not-hover:m-4';
    const expected = `
        .not-hover\\:m-4:not(:hover) { margin: 1rem } 
        
        @media not (hover: hover) {
            .not-hover\\:m-4 { margin: 1rem }
        }
    `;

    return testUtility(source, expected);
});
