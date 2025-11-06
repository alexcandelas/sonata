import testUtility from '../../utils/testUtility.js';
import { it } from "vitest";

it.each([
    [
        'print:m-4',
        `@media print {
            .print\\:m-4 { margin: 1rem; }
        }`
    ],
])('generates print variants (%s)', testUtility);
