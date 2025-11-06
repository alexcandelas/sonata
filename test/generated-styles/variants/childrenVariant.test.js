import testUtility from '../../utils/testUtility.js';
import { it } from "vitest";

it.each([
    ['*:m-4', '.\\*\\:m-4 > * { margin: 1rem; }'],
])('generates direct children variant (%s)', testUtility);
