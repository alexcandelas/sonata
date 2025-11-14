import testUtility from '../../utils/testUtility.js';
import { it } from "vitest";

const config = {
    colors: {
        'primary': '#502a7a',
    },
};

it.each([
    ['root:bg-primary', ':root:where(:has(.root\\:bg-primary)) { background-color: var(--color-primary) }'],
    ['root:fs-16px', ':root:where(:has(.root\\:fs-16px)) { font-size: 16px }'],
    ['root:scroll-pt-8', ':root:where(:has(.root\\:scroll-pt-8)) { scroll-padding-top: 2rem }'],
])('generates root variants (%s)',
    (source, expected) => testUtility(source, expected, config)
);
