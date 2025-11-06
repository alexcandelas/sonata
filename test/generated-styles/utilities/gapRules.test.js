import testUtility from '../../utils/testUtility.js';
import { it } from "vitest";

it.each([
    ['gap-0', '.gap-0 { gap: 0; }'],
    ['gap-1', '.gap-1 { gap: 0.25rem; }'],
    ['gap-0.5cm', '.gap-0\\.5cm { gap: 0.5cm; }'],
    ['gap-10%', '.gap-10\\% { gap: 10%; }'],
    ['gap-30vmin', '.gap-30vmin { gap: 30vmin; }'],
    ['gap-x-1', '.gap-x-1 { column-gap: 0.25rem; }'],
    ['gap-x-0.5cm', '.gap-x-0\\.5cm { column-gap: 0.5cm; }'],
    ['gap-x-10%', '.gap-x-10\\% { column-gap: 10%; }'],
    ['gap-x-30vmin', '.gap-x-30vmin { column-gap: 30vmin; }'],
    ['gap-y-1', '.gap-y-1 { row-gap: 0.25rem; }'],
    ['gap-y-0.5cm', '.gap-y-0\\.5cm { row-gap: 0.5cm; }'],
    ['gap-y-10%', '.gap-y-10\\% { row-gap: 10%; }'],
    ['gap-y-30vmin', '.gap-y-30vmin { row-gap: 30vmin; }'],
])('generates gap utilities (%s)', testUtility);
