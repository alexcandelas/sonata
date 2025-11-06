import testUtility from '../../utils/testUtility.js';
import { it } from "vitest";

it.each([
    ['row', `.row { 
        --grid-columns: 1;
        column-gap: var(--gutter);
        display: grid;
        grid-template-columns: 1fr;
    }`],
    ['row/auto', `.row\\/auto { 
        column-gap: var(--gutter);
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
    }`],
    ['row/10', `.row\\/10 { 
        --grid-columns: 10;
        column-gap: var(--gutter); 
        display: grid;
        grid-template-columns: repeat(var(--grid-columns), 1fr);
    }`],
])('generates row abstractions (%s)', testUtility);

it.each([
    ['col', '.col { grid-column-end: span var(--grid-columns); }'],
    ['col-1/2', '.col-1\\/2 { grid-column-end: span calc(var(--grid-columns) * 1/2); }'],
    ['col-7/12', '.col-7\\/12 { grid-column-end: span calc(var(--grid-columns) * 7/12); }'],
])('generates column abstractions (%s)', testUtility);
