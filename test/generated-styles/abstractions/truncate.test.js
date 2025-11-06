import testUtility from '../../utils/testUtility.js';
import { it } from "vitest";

it.each([
    ['truncate', `.truncate {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }`],
    ['truncate-none', `.truncate-none {
        overflow: visible;
        text-overflow: clip;
        white-space: normal;
    }`],
])('generates truncate abstractions (%s)', testUtility);
