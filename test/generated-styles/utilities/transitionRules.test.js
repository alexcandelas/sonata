import testUtility from '../../utils/testUtility.js';
import { it } from "vitest";

it.each([
    ['transition-all', '.transition-all { transition-property: all }'],
    ['transition-none', '.transition-none { transition-property: none }'],
])('generates full-scope transition utilities (%s)', testUtility);

it.each([
    ['transition-150', '.transition-150 { transition-duration: 150ms }'],
    ['transition-250ms', '.transition-250ms { transition-duration: 250ms }'],
    ['transition-1s', '.transition-1s { transition-duration: 1s }'],
    ['transition-1.5s', '.transition-1\\.5s { transition-duration: 1.5s }'],
    ['transition-0', '.transition-0 { transition-duration: 0s }'],
])('generates transition-duration utilities (%s)', testUtility);

it.each([
    ['transition-delay-150', '.transition-delay-150 { transition-delay: 150ms }'],
    ['transition-delay-250ms', '.transition-delay-250ms { transition-delay: 250ms }'],
    ['transition-delay-1s', '.transition-delay-1s { transition-delay: 1s }'],
    ['transition-delay-0', '.transition-delay-0 { transition-delay: 0s }'],
    ['-transition-delay-150', '.-transition-delay-150 { transition-delay: -150ms }'],
    ['-transition-delay-0.5s', '.-transition-delay-0\\.5s { transition-delay: -0.5s }'],
])('generates transition-delay utilities (%s)', testUtility);

it.each([
    ['transition-linear', '.transition-linear { transition-timing-function: linear }'],
    ['transition-ease', '.transition-ease { transition-timing-function: ease }'],
    ['transition-in', '.transition-in { transition-timing-function: ease-in }'],
    ['transition-out', '.transition-out { transition-timing-function: ease-out }'],
    ['transition-in-out', '.transition-in-out { transition-timing-function: ease-in-out }'],
])('generates transition-timing-function utilities (%s)', testUtility);
