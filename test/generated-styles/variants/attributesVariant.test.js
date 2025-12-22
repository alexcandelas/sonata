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

it.each([
    ['not-aria-busy:m-4', '.not-aria-busy\\:m-4:not([aria-busy="true"]) { margin: 1rem; }'],
    ['not-aria-checked:m-4', '.not-aria-checked\\:m-4:not([aria-checked="true"]) { margin: 1rem; }'],
    ['not-aria-disabled:m-4', '.not-aria-disabled\\:m-4:not([aria-disabled="true"]) { margin: 1rem; }'],
    ['not-aria-expanded:m-4', '.not-aria-expanded\\:m-4:not([aria-expanded="true"]) { margin: 1rem; }'],
    ['not-aria-hidden:m-4', '.not-aria-hidden\\:m-4:not([aria-hidden="true"]) { margin: 1rem; }'],
    ['not-aria-pressed:m-4', '.not-aria-pressed\\:m-4:not([aria-pressed="true"]) { margin: 1rem; }'],
    ['not-aria-readonly:m-4', '.not-aria-readonly\\:m-4:not([aria-readonly="true"]) { margin: 1rem; }'],
    ['not-aria-required:m-4', '.not-aria-required\\:m-4:not([aria-required="true"]) { margin: 1rem; }'],
    ['not-aria-selected:m-4', '.not-aria-selected\\:m-4:not([aria-selected="true"]) { margin: 1rem; }'],
])('negates attribute variants (%s)', testUtility);
