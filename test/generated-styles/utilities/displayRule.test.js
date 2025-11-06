import testUtility from '../../utils/testUtility.js';
import { it } from "vitest";

it.each([
    ['hidden', '.hidden { display: none; }'],
    ['d-none', '.d-none { display: none; }'],
    ['d-block', '.d-block { display: block; }'],
    ['d-table', '.d-table { display: table; }'],
    ['d-list-item', '.d-list-item { display: list-item; }'],
    ['d-table-header-group', '.d-table-header-group { display: table-header-group; }'],
])('generates display utilities (%s)', testUtility);
