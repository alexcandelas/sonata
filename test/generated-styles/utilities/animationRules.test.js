import testUtility from '../../utils/testUtility.js';
import { it } from "vitest";

it.each([
    ['animation-delay-150', '.animation-delay-150 { animation-delay: 150ms }'],
    ['animation-delay-250ms', '.animation-delay-250ms { animation-delay: 250ms }'],
    ['animation-delay-1s', '.animation-delay-1s { animation-delay: 1s }'],
    ['animation-delay-0', '.animation-delay-0 { animation-delay: 0s }'],
    ['-animation-delay-150', '.-animation-delay-150 { animation-delay: -150ms }'],
    ['-animation-delay-0.5s', '.-animation-delay-0\\.5s { animation-delay: -0.5s }'],
])('generates animation-delay utilities (%s)', testUtility);

it.each([
    ['animation-normal', '.animation-normal { animation-direction: normal }'],
    ['animation-reverse', '.animation-reverse { animation-direction: reverse }'],
    ['animation-alternate', '.animation-alternate { animation-direction: alternate }'],
    ['animation-alternate-reverse', '.animation-alternate-reverse { animation-direction: alternate-reverse }'],
])('generates animation-direction utilities (%s)', testUtility);

it.each([
    ['animation-150', '.animation-150 { animation-duration: 150ms }'],
    ['animation-250ms', '.animation-250ms { animation-duration: 250ms }'],
    ['animation-1s', '.animation-1s { animation-duration: 1s }'],
    ['animation-1.5s', '.animation-1\\.5s { animation-duration: 1.5s }'],
    ['animation-0', '.animation-0 { animation-duration: 0s }'],
])('generates animation-duration utilities (%s)', testUtility);

it.each([
    ['animation-none', '.animation-none { animation-fill-mode: none }'],
    ['animation-forwards', '.animation-forwards { animation-fill-mode: forwards }'],
    ['animation-backwards', '.animation-backwards { animation-fill-mode: backwards }'],
    ['animation-both', '.animation-both { animation-fill-mode: both }'],
])('generates animation-fill-mode utilities (%s)', testUtility);

it.each([
    ['animation-infinite', '.animation-infinite { animation-iteration-count: infinite }'],
])('generates animation-iteration-count utilities (%s)', testUtility);

it.each([
    ['animation-paused', '.animation-paused { animation-play-state: paused }'],
    ['animation-running', '.animation-running { animation-play-state: running }'],
])('generates animation-play-state utilities (%s)', testUtility);

it.each([
    ['animation-linear', '.animation-linear { animation-timing-function: linear }'],
    ['animation-ease', '.animation-ease { animation-timing-function: ease }'],
    ['animation-in', '.animation-in { animation-timing-function: ease-in }'],
    ['animation-out', '.animation-out { animation-timing-function: ease-out }'],
    ['animation-in-out', '.animation-in-out { animation-timing-function: ease-in-out }'],
])('generates animation-timing-function utilities (%s)', testUtility);
