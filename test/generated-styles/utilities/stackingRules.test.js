import testUtility from '../../utils/testUtility.js';
import { it } from "vitest";

it.each([
    ['isolate', '.isolate { isolation: isolate; }'],
    ['isolation-auto', '.isolation-auto { isolation: auto; }'],
])('generates isolation utilities (%s)', testUtility);

it.each([
    ['z-auto', '.z-auto { z-index: auto; }'],
    ['z-0', '.z-0 { z-index: 0; }'],
    ['-z-1', '.-z-1 { z-index: -1; }'],
    ['z-5', '.z-5 { z-index: 5; }'],
    ['-z-0', ''],
])('generates z-index utilities (%s)', testUtility);
