import testUtility from '../../utils/testUtility.js';
import { it } from "vitest";

it.each([
    ['columns-auto', '.columns-auto {columns: auto;}'],
    ['columns-3', '.columns-3 {columns: 3;}'],
    ['columns-600px', '.columns-600px {columns: 600px;}'],
    ['columns-50.5rem', '.columns-50\\.5rem {columns: 50.5rem;}'],
])('generates column utilities (%s)', testUtility);

it('does not generate column utilities with percentage units',
    testUtility('columns-20%', '')
);

it.each([
    ['columns-0', ''],
    ['columns--1px', ''],
    ['-columns-2', ''],
    ['columns-0rem', ''],
])('does not generate column utilities with 0 or negative value', testUtility);
