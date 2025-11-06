import testUtility from '../../utils/testUtility.js';
import { it } from "vitest";

it.each([
    ['ratio-square', '.ratio-square {aspect-ratio: 1/1;}'],
    ['ratio-1', '.ratio-1 {aspect-ratio: 1/1;}'],
    ['ratio-4/3', '.ratio-4\\/3 {aspect-ratio: 4/3;}'],
    ['ratio-16/9', '.ratio-16\\/9 {aspect-ratio: 16/9;}'],
    ['ratio-auto', '.ratio-auto {aspect-ratio: auto;}'],
])('generates aspect ratio utilities (%s)', testUtility);
