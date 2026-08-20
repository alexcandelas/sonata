import testUtility from '../../utils/testUtility.js';
import { it } from "vitest";

it.each([
    ['hidden', '.hidden { display: none; }'],
    ['d-none', '.d-none { display: none; }'],
    ['d-block', '.d-block { display: block; }'],
    ['d-inline-block', '.d-inline-block { display: inline-block; }'],
    ['d-iblock', '.d-iblock { display: inline-block; }'],
    ['d-flex', '.d-flex { display: flex; }'],
    ['d-inline-flex', '.d-inline-flex { display: inline-flex; }'],
    ['d-iflex', '.d-iflex { display: inline-flex; }'],
    ['d-grid', '.d-grid { display: grid; }'],
    ['d-inline-grid', '.d-inline-grid { display: inline-grid; }'],
    ['d-igrid', '.d-igrid { display: inline-grid; }'],
    ['d-table', '.d-table { display: table; }'],
    ['d-inline-table', '.d-inline-table { display: inline-table; }'],
    ['d-itable', '.d-itable { display: inline-table; }'],
    ['d-list-item', '.d-list-item { display: list-item; }'],
    ['d-table-header-group', '.d-table-header-group { display: table-header-group; }'],
])('generates display utilities (%s)', testUtility);
