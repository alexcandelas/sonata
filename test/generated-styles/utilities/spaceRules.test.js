import testUtility from '../../utils/testUtility.js';
import { it } from "vitest";

it.each([
    ['space-x-4', '.space-x-4 { margin-inline-start: 0; margin-inline-end: 1rem; }'],
    ['space-x-6', '.space-x-6 { margin-inline-start: 0; margin-inline-end: 1.5rem; }'],
    ['space-x-1px', '.space-x-1px { margin-inline-start: 0; margin-inline-end: 1px; }'],
    ['-space-x-1.5rem', '.-space-x-1\\.5rem { margin-inline-start: 0; margin-inline-end: -1.5rem; }'],
    ['space-y-4', '.space-y-4 { margin-block-start: 0; margin-block-end: 1rem; }'],
    ['space-y-6', '.space-y-6 { margin-block-start: 0; margin-block-end: 1.5rem; }'],
    ['space-y-1px', '.space-y-1px { margin-block-start: 0; margin-block-end: 1px; }'],
    ['-space-y-1.5rem', '.-space-y-1\\.5rem { margin-block-start: 0; margin-block-end: -1.5rem; }'],
    ['space-x-3foo', ''],
    ['space-y-2.5', ''],
])('generates space utilities (%s)', testUtility);
