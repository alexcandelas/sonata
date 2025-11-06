import testUtility from '../../utils/testUtility.js';
import { it } from "vitest";

it.each([
    ['h-auto', '.h-auto { height: auto; }'],
    ['h-max', '.h-max { height: max-content; }'],
    ['h-min', '.h-min { height: min-content; }'],
    ['h-fit', '.h-fit { height: fit-content; }'],
    ['h-full', '.h-full { height: 100%; }'],
    ['h-screen', '.h-screen { height: 100vh; }'],
    ['h-0', '.h-0 { height: 0; }'],
    ['h-8', '.h-8 { height: 2rem; }'],
    ['h-1px', '.h-1px { height: 1px; }'],
    ['h-1.25rem', '.h-1\\.25rem { height: 1.25rem; }'],
    ['h-25%', '.h-25\\% { height: 25%; }'],
    ['h-1/3', '.h-1\\/3 { height: calc(1/3 * 100%); }'],
])('generates height utilities (%s)', testUtility);

it.each([
    ['min-h-auto', '.min-h-auto { min-height: auto; }'],
    ['min-h-max', '.min-h-max { min-height: max-content; }'],
    ['min-h-min', '.min-h-min { min-height: min-content; }'],
    ['min-h-fit', '.min-h-fit { min-height: fit-content; }'],
    ['min-h-full', '.min-h-full { min-height: 100%; }'],
    ['min-h-screen', '.min-h-screen { min-height: 100vh; }'],
    ['min-h-0', '.min-h-0 { min-height: 0; }'],
    ['min-h-8', '.min-h-8 { min-height: 2rem; }'],
    ['min-h-1px', '.min-h-1px { min-height: 1px; }'],
    ['min-h-1.25rem', '.min-h-1\\.25rem { min-height: 1.25rem; }'],
    ['min-h-25%', '.min-h-25\\% { min-height: 25%; }'],
    ['min-h-1/3', '.min-h-1\\/3 { min-height: calc(1/3 * 100%); }'],
])('generates min-height utilities (%s)', testUtility);

it.each([
    ['max-h-auto', '.max-h-auto { max-height: auto; }'],
    ['max-h-none', '.max-h-none { max-height: none; }'],
    ['max-h-max', '.max-h-max { max-height: max-content; }'],
    ['max-h-min', '.max-h-min { max-height: min-content; }'],
    ['max-h-fit', '.max-h-fit { max-height: fit-content; }'],
    ['max-h-full', '.max-h-full { max-height: 100%; }'],
    ['max-h-screen', '.max-h-screen { max-height: 100vh; }'],
    ['max-h-0', '.max-h-0 { max-height: 0; }'],
    ['max-h-8', '.max-h-8 { max-height: 2rem; }'],
    ['max-h-1px', '.max-h-1px { max-height: 1px; }'],
    ['max-h-1.25rem', '.max-h-1\\.25rem { max-height: 1.25rem; }'],
    ['max-h-25%', '.max-h-25\\% { max-height: 25%; }'],
    ['max-h-1/3', '.max-h-1\\/3 { max-height: calc(1/3 * 100%); }'],
])('generates max-height utilities (%s)', testUtility);
