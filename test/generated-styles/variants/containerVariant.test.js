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
        '@lg:m-4',
        `@container (width >= 1000px) {
            .\\@lg\\:m-4{ margin: 1rem; }
        }`
    ],
    [
        '@600px:m-4',
        `@container (width >= 600px) {
            .\\@600px\\:m-4{ margin: 1rem; }
        }`
    ],
    [
        '@600:m-4',
        `@container (width >= 600px) {
            .\\@600\\:m-4{ margin: 1rem; }
        }`
    ],
])('generates `min-width` container queries (%s)',
    (source, expected) => testUtility(source, expected, config)
);

it.each([
    [
        '@<lg:m-4',
        `@container (width < 1000px) {
            .\\@\\<lg\\:m-4{ margin: 1rem; }
        }`
    ],
    [
        '@<600px:m-4',
        `@container (width < 600px) {
            .\\@\\<600px\\:m-4{ margin: 1rem; }
        }`
    ],
    [
        '@<600:m-4',
        `@container (width < 600px) {
            .\\@\\<600\\:m-4{ margin: 1rem; }
        }`
    ],
])('generates `max-width` container queries (%s)',
    (source, expected) => testUtility(source, expected, config)
);

it.each([
    [
        '@md<lg:m-4',
        `@container (800px <= width < 1000px) {
            .\\@md\\<lg\\:m-4{ margin: 1rem; }
        }`
    ],
    [
        '@450px<600px:m-4',
        `@container (450px <= width < 600px) {
            .\\@450px\\<600px\\:m-4{ margin: 1rem; }
        }`
    ],
    [
        '@450<600:m-4',
        `@container (450px <= width < 600px) {
            .\\@450\\<600\\:m-4{ margin: 1rem; }
        }`
    ],
    [
        '@md<1200:m-4',
        `@container (800px <= width < 1200px) {
            .\\@md\\<1200\\:m-4{ margin: 1rem; }
        }`
    ],
    [
        '@300<lg:m-4',
        `@container (300px <= width < 1000px) {
            .\\@300\\<lg\\:m-4{ margin: 1rem; }
        }`
    ],
])('generates range container queries (%s)',
    (source, expected) => testUtility(source, expected, config)
);

it.each([
    [
        '@lg/named:m-4',
        `@container named (width >= 1000px) {
            .\\@lg\\/named\\:m-4{ margin: 1rem; }
        }`
    ],
    [
        '@600px/NamedContainer:m-4',
        `@container NamedContainer (width >= 600px) {
            .\\@600px\\/NamedContainer\\:m-4{ margin: 1rem; }
        }`
    ],
    [
        '@600/container-1:m-4',
        `@container container-1 (width >= 600px) {
            .\\@600\\/container-1\\:m-4{ margin: 1rem; }
        }`
    ],
])('generates `min-width` named container queries (%s)',
    (source, expected) => testUtility(source, expected, config)
);

it.each([
    [
        '@<lg/named:m-4',
        `@container named (width < 1000px) {
            .\\@\\<lg\\/named\\:m-4{ margin: 1rem; }
        }`
    ],
    [
        '@<600px/NamedContainer:m-4',
        `@container NamedContainer (width < 600px) {
            .\\@\\<600px\\/NamedContainer\\:m-4{ margin: 1rem; }
        }`
    ],
    [
        '@<600/NamedContainer2:m-4',
        `@container NamedContainer2 (width < 600px) {
            .\\@\\<600\\/NamedContainer2\\:m-4{ margin: 1rem; }
        }`
    ],
])('generates `max-width` named container queries (%s)',
    (source, expected) => testUtility(source, expected, config)
);

it.each([
    [
        '@md<lg/named:m-4',
        `@container named (800px <= width < 1000px) {
            .\\@md\\<lg\\/named\\:m-4{ margin: 1rem; }
        }`
    ],
    [
        '@450px<600px/namedContainer:m-4',
        `@container namedContainer (450px <= width < 600px) {
            .\\@450px\\<600px\\/namedContainer\\:m-4{ margin: 1rem; }
        }`
    ],
    [
        '@450<600/named_container:m-4',
        `@container named_container (450px <= width < 600px) {
            .\\@450\\<600\\/named_container\\:m-4{ margin: 1rem; }
        }`
    ],
    [
        '@md<1200/named-container:m-4',
        `@container named-container (800px <= width < 1200px) {
            .\\@md\\<1200\\/named-container\\:m-4{ margin: 1rem; }
        }`
    ],
    [
        '@300<lg/named:m-4',
        `@container named (300px <= width < 1000px) {
            .\\@300\\<lg\\/named\\:m-4{ margin: 1rem; }
        }`
    ],
])('generates range named container queries (%s)',
    (source, expected) => testUtility(source, expected, config)
);

it.each([
    ['@foo:m-4'],
    ['@LG:m-4'],
    ['@foo/named:m-4'],
    ['@LG/named:m-4']
])('ignores undefined breakpoints (%s)',
    (source) => testUtility(source, '', config)
);

it.each([
    ['@foo<800:m-4'],
    ['@foo:800:m-4'],
    ['@<sm<lg:m-4'],
    ['@foo<800/named:m-4'],
    ['@foo:800/named:m-4'],
    ['@<sm<lg/named:m-4'],
])('ignores invalid ranges (%s)',
    (source) => testUtility(source, '', config)
);
