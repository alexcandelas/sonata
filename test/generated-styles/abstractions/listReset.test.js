import testUtility from '../../utils/testUtility.js';
import { it } from "vitest";

it.each([
    ['list-reset', `.list-reset {
        list-style: none;
        padding-left: 0;
    }`],
])('generates `list-reset` abstraction (%s)', testUtility);
