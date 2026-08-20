import testUtility from '../../utils/testUtility.js';
import { it } from "vitest";

it.each([
    ['stack', `
        .stack {
            display: grid;
            place-items: center;
        }
    
        .stack > * {
            grid-area: 1 / 1;
        }
    `],
])('generates `stack` abstraction (%s)', testUtility);
