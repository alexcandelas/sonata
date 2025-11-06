import testUtility from '../../utils/testUtility.js';
import { it } from "vitest";

it.each([
    ['clear-none', '.clear-none { clear: none; }'],
    ['clear-left', '.clear-left { clear: left; }'],
    ['clear-right', '.clear-right { clear: right; }'],
    ['clear-both', '.clear-both { clear: both; }'],
    ['clear-start', '.clear-start { clear: inline-start; }'],
    ['clear-end', '.clear-end { clear: inline-end; }'],
])('generates clear utilities (%s)', testUtility);

it.each([
    ['float-left', '.float-left { float: left; }'],
    ['float-right', '.float-right { float: right; }'],
    ['float-none', '.float-none { float: none; }'],
    ['float-start', '.float-start { float: inline-start; }'],
    ['float-end', '.float-end { float: inline-end; }'],
])('generates float utilities (%s)', testUtility);
