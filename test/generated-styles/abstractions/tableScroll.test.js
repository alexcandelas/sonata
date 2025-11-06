import testUtility from '../../utils/testUtility.js';
import { it } from "vitest";

it.each([
    ['table-scroll', `.table-scroll {
        -webkit-overflow-scrolling: touch;
        max-width: 100%;
        overflow-x: auto;
    }`],
])('generates `table-scroll` abstraction (%s)', testUtility);
