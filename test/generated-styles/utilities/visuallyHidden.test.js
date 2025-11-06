import testUtility from '../../utils/testUtility.js';
import { it } from "vitest";

it.each([
    ['visually-hidden', `.visually-hidden { 
        border: 0;
        clip: rect(0, 0, 0, 0);
        height: 1px;
        margin: -1px;
        overflow: hidden;
        padding: 0;
        position: absolute;
        white-space: nowrap;
        width: 1px;
    }`],
    ['visually-hidden-focusable', `.visually-hidden-focusable:where(:not(:active):not(:focus):not(:focus-within)) { 
        border: 0;
        clip: rect(0, 0, 0, 0);
        height: 1px;
        margin: -1px;
        overflow: hidden;
        padding: 0;
        position: absolute;
        white-space: nowrap;
        width: 1px;
    }`],
    ['not-visually-hidden', `.not-visually-hidden { 
        clip: auto;
        height: auto;
        margin: 0;
        overflow: visible;
        position: static;
        white-space: inherit;
        width: auto;
    }`],
])('generates visually-hidden utilities (%s)', testUtility);
