import testUtility from '../../utils/testUtility.js';
import { it } from "vitest";

it.each([
    ['dark:m-4', '.dark\\:m-4:where(.dark, .dark *) { margin: 1rem; }'],
    [
        '@dark:m-4',
        `@media (prefers-color-scheme: dark) {
            .\\@dark\\:m-4 { margin: 1rem; }
        }`
    ],
])('generates dark theme variants (%s)', testUtility);

it.each([
    ['light:m-4', '.light\\:m-4:where(.light, .light *) { margin: 1rem; }'],
    [
        '@light:m-4',
        `@media (prefers-color-scheme: light) {
            .\\@light\\:m-4 { margin: 1rem; }
        }`
    ],
])('generates light theme variants (%s)', testUtility);
