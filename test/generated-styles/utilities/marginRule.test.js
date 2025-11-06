import testUtility from '../../utils/testUtility.js';
import { it } from "vitest";

it.each([
    ['m-4', '.m-4 {margin: 1rem;}'],
    ['-m-6', '.-m-6 {margin: -1.5rem;}'],
    ['m-20rem', '.m-20rem {margin: 20rem;}'],
    ['m-10px', '.m-10px {margin: 10px;}'],
    ['-m-3cm', '.-m-3cm {margin: -3cm;}'],
    ['m-25%', '.m-25\\% {margin: 25%;}'],
    ['m-1/12', '.m-1\\/12 {margin: calc(1 / 12 * 100%);}'],
    ['-m-1/3', '.-m-1\\/3 {margin: calc(1 / 3 * -100%);}'],
    ['m-auto', '.m-auto {margin: auto;}'],
    ['m-container', '.m-container {margin: var(--container-padding);}'],
    ['-m-container', '.-m-container {margin: calc(var(--container-padding) * -1);}'],
    ['m-4foo', '']
])('generates margins (%s)', testUtility);

it.each([
    ['-mt-1px', '.-mt-1px {margin-top: -1px;}'],
    ['mb-4', '.mb-4 {margin-bottom: 1rem;}'],
    ['ml-2.5cm', '.ml-2\\.5cm {margin-left: 2.5cm;}'],
    ['ml-1/4', '.ml-1\\/4 {margin-left: calc(1 / 4 * 100%);}'],
    ['mr-0', '.mr-0 {margin-right: 0;}'],
    ['mx-2', '.mx-2 {margin-inline: 0.5rem;}'],
    ['mx-1/12', '.mx-1\\/12 {margin-inline: calc(1 / 12 * 100%);}'],
    ['-my-4', '.-my-4 {margin-block: -1rem;}'],
    ['-my-1/10', '.-my-1\\/10 {margin-block: calc(1 / 10 * -100%);}'],
    ['mbs-0', '.mbs-0 {margin-block-start: 0;}'],
    ['mbe-4', '.mbe-4 {margin-block-end: 1rem;}'],
    ['mis-4', '.mis-4 {margin-inline-start: 1rem;}'],
    ['mie-4', '.mie-4 {margin-inline-end: 1rem;}'],
    ['mie-3/5', '.mie-3\\/5 {margin-inline-end: calc(3 / 5 * 100%);}'],
    ['mx-auto', '.mx-auto {margin-inline: auto;}'],
    ['mx-container', '.mx-container {margin-inline: var(--container-padding)}'],
    ['-mx-container', '.-mx-container {margin-inline: calc(var(--container-padding) * -1)}'],
])('generates directional margins (%s)', testUtility);
