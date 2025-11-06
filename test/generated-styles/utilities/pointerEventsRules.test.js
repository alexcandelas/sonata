import testUtility from '../../utils/testUtility.js';
import { it } from "vitest";

it.each([
    ['pointer-events-auto', '.pointer-events-auto { pointer-events: auto; }'],
    ['pointer-events-none', '.pointer-events-none { pointer-events: none; }'],
    ['pointer-events-invalid', ''],
])('generates pointer-events utilities (%s)', testUtility);
