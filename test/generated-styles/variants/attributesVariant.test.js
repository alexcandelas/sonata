import testUtility from '../../utils/testUtility.js';
import { it } from "vitest";

it.each([
    ['aria-busy:m-4', '.aria-busy\\:m-4[aria-busy="true"] { margin: 1rem; }'],
    ['aria-checked:m-4', '.aria-checked\\:m-4[aria-checked="true"] { margin: 1rem; }'],
    ['aria-disabled:m-4', '.aria-disabled\\:m-4[aria-disabled="true"] { margin: 1rem; }'],
    ['aria-expanded:m-4', '.aria-expanded\\:m-4[aria-expanded="true"] { margin: 1rem; }'],
    ['aria-hidden:m-4', '.aria-hidden\\:m-4[aria-hidden="true"] { margin: 1rem; }'],
    ['aria-pressed:m-4', '.aria-pressed\\:m-4[aria-pressed="true"] { margin: 1rem; }'],
    ['aria-readonly:m-4', '.aria-readonly\\:m-4[aria-readonly="true"] { margin: 1rem; }'],
    ['aria-required:m-4', '.aria-required\\:m-4[aria-required="true"] { margin: 1rem; }'],
    ['aria-selected:m-4', '.aria-selected\\:m-4[aria-selected="true"] { margin: 1rem; }'],
])('generates ARIA attributes variants (%s)', testUtility);
