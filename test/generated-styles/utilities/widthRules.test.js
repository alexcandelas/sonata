import testUtility from '../../utils/testUtility.js';
import { it } from "vitest";

it.each([
    ['w-auto', '.w-auto { width: auto; }'],
    ['w-max', '.w-max { width: max-content; }'],
    ['w-min', '.w-min { width: min-content; }'],
    ['w-fit', '.w-fit { width: fit-content; }'],
    ['w-full', '.w-full { width: 100%; }'],
    ['w-screen', '.w-screen { width: 100vw; }'],
    ['w-0', '.w-0 { width: 0; }'],
    ['w-8', '.w-8 { width: 2rem; }'],
    ['w-1px', '.w-1px { width: 1px; }'],
    ['w-1.25rem', '.w-1\\.25rem { width: 1.25rem; }'],
    ['w-25%', '.w-25\\% { width: 25%; }'],
    ['w-1/3', '.w-1\\/3 { width: calc(1/3 * 100%); }'],
])('generates width utilities (%s)', testUtility);

it.each([
    ['min-w-auto', '.min-w-auto { min-width: auto; }'],
    ['min-w-max', '.min-w-max { min-width: max-content; }'],
    ['min-w-min', '.min-w-min { min-width: min-content; }'],
    ['min-w-fit', '.min-w-fit { min-width: fit-content; }'],
    ['min-w-full', '.min-w-full { min-width: 100%; }'],
    ['min-w-screen', '.min-w-screen { min-width: 100vw; }'],
    ['min-w-0', '.min-w-0 { min-width: 0; }'],
    ['min-w-8', '.min-w-8 { min-width: 2rem; }'],
    ['min-w-1px', '.min-w-1px { min-width: 1px; }'],
    ['min-w-1.25rem', '.min-w-1\\.25rem { min-width: 1.25rem; }'],
    ['min-w-25%', '.min-w-25\\% { min-width: 25%; }'],
    ['min-w-1/3', '.min-w-1\\/3 { min-width: calc(1/3 * 100%); }'],
])('generates min-width utilities (%s)', testUtility);

it.each([
    ['max-w-auto', '.max-w-auto { max-width: auto; }'],
    ['max-w-none', '.max-w-none { max-width: none; }'],
    ['max-w-max', '.max-w-max { max-width: max-content; }'],
    ['max-w-min', '.max-w-min { max-width: min-content; }'],
    ['max-w-fit', '.max-w-fit { max-width: fit-content; }'],
    ['max-w-full', '.max-w-full { max-width: 100%; }'],
    ['max-w-screen', '.max-w-screen { max-width: 100vw; }'],
    ['max-w-0', '.max-w-0 { max-width: 0; }'],
    ['max-w-8', '.max-w-8 { max-width: 2rem; }'],
    ['max-w-1px', '.max-w-1px { max-width: 1px; }'],
    ['max-w-1.25rem', '.max-w-1\\.25rem { max-width: 1.25rem; }'],
    ['max-w-25%', '.max-w-25\\% { max-width: 25%; }'],
    ['max-w-1/3', '.max-w-1\\/3 { max-width: calc(1/3 * 100%); }'],
])('generates max-width utilities (%s)', testUtility);
