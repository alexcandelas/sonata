import testUtility from '../../utils/testUtility.js';
import { it } from "vitest";

it.each([
    ['link-overlay', `.link-overlay::after { 
        content: "";
        inset: 0;
        position: absolute;
        z-index: 1;
    }`],
])('generates `link-overlay` abstraction (%s)', testUtility);
