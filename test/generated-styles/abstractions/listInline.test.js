import testUtility from '../../utils/testUtility.js';
import { it } from "vitest";

it.each([
    ['list-inline', `
        .list-inline {
            list-style: none;
            padding-left: 0;
        }
        
        .list-inline > li {
            display: inline-block;
        }
    `],
])('generates `list-inline` abstraction (%s)', testUtility);
