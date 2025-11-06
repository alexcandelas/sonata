import testUtility from '../../utils/testUtility.js';
import { it } from "vitest";

it.each([
    ['order-first', '.order-first { order: -9999; }'],
    ['order-last', '.order-last { order: 9999; }'],
    ['order-0', '.order-0 { order: 0; }'],
    ['order-1', '.order-1 { order: 1; }'],
    ['-order-1', '.-order-1 { order: -1; }'],
])('generates flex utilities (%s)', testUtility);
