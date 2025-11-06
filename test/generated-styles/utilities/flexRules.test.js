import testUtility from '../../utils/testUtility.js';
import { it } from "vitest";

it.each([
    ['flex-auto', '.flex-auto { flex: auto; }'],
    ['flex-initial', '.flex-initial { flex: initial; }'],
    ['flex-none', '.flex-none { flex: none; }'],
    ['flex-0', '.flex-0 { flex: 0 1 0; }'],
    ['flex-1', '.flex-1 { flex: 1 1 0; }'],
    ['flex-3', '.flex-3 { flex: 3 1 0; }'],
])('generates flex utilities (%s)', testUtility);

it.each([
    ['flex-basis-auto', '.flex-basis-auto { flex-basis: auto; }'],
    ['flex-basis-content', '.flex-basis-content { flex-basis: content; }'],
    ['flex-basis-max', '.flex-basis-max { flex-basis: max-content; }'],
    ['flex-basis-min', '.flex-basis-min { flex-basis: min-content; }'],
    ['flex-basis-fit', '.flex-basis-fit { flex-basis: fit-content; }'],
    ['flex-basis-full', '.flex-basis-full { flex-basis: 100%; }'],
    ['flex-basis-0', '.flex-basis-0 { flex-basis: 0; }'],
    ['flex-basis-0%', '.flex-basis-0\\% { flex-basis: 0; }'],
    ['flex-basis-2.5rem', '.flex-basis-2\\.5rem { flex-basis: 2.5rem; }'],
    ['flex-basis-3', '.flex-basis-3 { flex-basis: 0.75rem; }'],
])('generates flex-basis utilities (%s)', testUtility);

it.each([
    ['flex-row', '.flex-row { flex-direction: row; }'],
    ['flex-row-reverse', '.flex-row-reverse { flex-direction: row-reverse; }'],
    ['flex-col', '.flex-col { flex-direction: column; }'],
    ['flex-col-reverse', '.flex-col-reverse { flex-direction: column-reverse; }'],
])('generates flex-direction utilities (%s)', testUtility);

it.each([
    ['flex-grow-1', '.flex-grow-1 { flex-grow: 1; }'],
    ['flex-grow-0.5', '.flex-grow-0\\.5 { flex-grow: 0.5; }'],
    ['flex-grow-3', '.flex-grow-3 { flex-grow: 3; }'],
])('generates flex-grow utilities (%s)', testUtility);

it.each([
    ['flex-shrink-0', '.flex-shrink-0 { flex-shrink: 0; }'],
    ['flex-shrink-1', '.flex-shrink-1 { flex-shrink: 1; }'],
])('generates flex-shrink utilities (%s)', testUtility);

it.each([
    ['flex-nowrap', '.flex-nowrap { flex-wrap: nowrap; }'],
    ['flex-wrap', '.flex-wrap { flex-wrap: wrap; }'],
    ['flex-wrap-reverse', '.flex-wrap-reverse { flex-wrap: wrap-reverse; }'],
])('generates flex-wrap utilities (%s)', testUtility);
