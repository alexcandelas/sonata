import testUtility from '../../utils/testUtility.js';
import { it } from "vitest";

const config = {
    boxShadow: {
        'xs': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'md': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        'DEFAULT': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    },
    insetBoxShadow: {
        '2xs': 'inset 0 1px rgb(0 0 0 / 0.05)',
        'sm': 'inset 0 2px 4px rgb(0 0 0 / 0.05)',
        'DEFAULT': 'inset 0 2px 4px rgb(0 0 0 / 0.05)',
    },
};

it.each([
    ['shadow-none', `.shadow-none {
        --sonata-box-shadow: 0 0; 
        box-shadow: var(--sonata-inset-box-shadow, 0 0), var(--sonata-box-shadow, 0 0);
    }`],
    ['shadow', `.shadow {
        --sonata-box-shadow: var(--box-shadow); 
        box-shadow: var(--sonata-inset-box-shadow, 0 0), var(--sonata-box-shadow, 0 0);
    }`],
    ['shadow-xs', `.shadow-xs {
        --sonata-box-shadow: var(--box-shadow-xs);
        box-shadow: var(--sonata-inset-box-shadow, 0 0), var(--sonata-box-shadow, 0 0);
    }`],
    ['shadow-md', `.shadow-md {
        --sonata-box-shadow: var(--box-shadow-md);
        box-shadow: var(--sonata-inset-box-shadow, 0 0), var(--sonata-box-shadow, 0 0);
    }`],
    ['shadow-2xl', `.shadow-2xl {
        --sonata-box-shadow: var(--box-shadow-2xl);
        box-shadow: var(--sonata-inset-box-shadow, 0 0), var(--sonata-box-shadow, 0 0);
    }`],
    ['shadow-invalid', ''],
])('generates box-shadow utilities (%s)',
    (source, expected) => testUtility(source, expected, config)
);

it.each([
    ['inset-shadow-none', `.inset-shadow-none {
        --sonata-inset-box-shadow: 0 0;
        box-shadow: var(--sonata-inset-box-shadow, 0 0), var(--sonata-box-shadow, 0 0);
    }`],
    ['inset-shadow', `.inset-shadow {
        --sonata-inset-box-shadow: var(--inset-box-shadow);
        box-shadow: var(--sonata-inset-box-shadow, 0 0), var(--sonata-box-shadow, 0 0);
    }`],
    ['inset-shadow-2xs', `.inset-shadow-2xs {
        --sonata-inset-box-shadow: var(--inset-box-shadow-2xs); 
        box-shadow: var(--sonata-inset-box-shadow, 0 0), var(--sonata-box-shadow, 0 0);
    }`],
    ['inset-shadow-sm', `.inset-shadow-sm {
        --sonata-inset-box-shadow: var(--inset-box-shadow-sm);
        box-shadow: var(--sonata-inset-box-shadow, 0 0), var(--sonata-box-shadow, 0 0);
    }`],
    ['inset-shadow-invalid', ''],
])('generates inset box-shadow utilities (%s)',
    (source, expected) => testUtility(source, expected, config)
);
