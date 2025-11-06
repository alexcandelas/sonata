import testUtility from '../../utils/testUtility.js';
import { it } from "vitest";

const config = {
    breakpoints: {
        'md': 800,
        'lg': 1000,
    },
};

it.each([
    [
        'lg:m-4',
        `@media (width >= 1000px) {
            .lg\\:m-4{ margin: 1rem; }
        }`
    ],
    [
        '600px:m-4',
        `@media (width >= 600px) {
            .\\3600px\\:m-4{ margin: 1rem; }
        }`
    ],
    [
        '600:m-4',
        `@media (width >= 600px) {
            .\\3600\\:m-4{ margin: 1rem; }
        }`
    ],
])('generates `min-width` queries (%s)',
    (source, expected) => testUtility(source, expected, config)
);

it.each([
    [
        '<lg:m-4',
        `@media (width < 1000px) {
            .\\<lg\\:m-4{ margin: 1rem; }
        }`
    ],
    [
        '<600px:m-4',
        `@media (width < 600px) {
            .\\<600px\\:m-4{ margin: 1rem; }
        }`
    ],
    [
        '<600:m-4',
        `@media (width < 600px) {
            .\\<600\\:m-4{ margin: 1rem; }
        }`
    ],
])('generates `max-width` queries (%s)',
    (source, expected) => testUtility(source, expected, config)
);

it.each([
    [
        'md<lg:m-4',
        `@media (800px <= width < 1000px) {
            .md\\<lg\\:m-4{ margin: 1rem; }
        }`
    ],
    [
        '450px<600px:m-4',
        `@media (450px <= width < 600px) {
            .\\3450px\\<600px\\:m-4{ margin: 1rem; }
        }`
    ],
    [
        '450<600:m-4',
        `@media (450px <= width < 600px) {
            .\\3450\\<600\\:m-4{ margin: 1rem; }
        }`
    ],
    [
        'md<1200:m-4',
        `@media (800px <= width < 1200px) {
            .md\\<1200\\:m-4{ margin: 1rem; }
        }`
    ],
    [
        '300<lg:m-4',
        `@media (300px <= width < 1000px) {
            .\\3300\\<lg\\:m-4{ margin: 1rem; }
        }`
    ],
])('generates range queries (%s)',
    (source, expected) => testUtility(source, expected, config)
);

it.each([
    ['foo:m-4'],
    ['LG:m-4']
])('ignores undefined breakpoints (%s)',
    (source) => testUtility(source, '', config)
);

it.each([
    ['foo<800:m-4'],
    ['foo:800:m-4'],
    ['<sm<lg:m-4'],
])('ignores invalid ranges (%s)',
    (source) => testUtility(source, '', config)
);
