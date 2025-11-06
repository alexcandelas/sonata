import testUtility from '../../utils/testUtility.js';
import { it } from "vitest";

const colors = {
    white: '#fff',
    blue: '00c',
    'blue-50': '#008ae8',
}

it.each([
    ['fill-inherit', '.fill-inherit { fill: inherit; }'],
    ['fill-current', '.fill-current { fill: currentColor; }'],
    ['fill-transparent', '.fill-transparent { fill: transparent; }'],
    ['fill-none', '.fill-none { fill: none; }'],
    ['fill-blue', '.fill-blue { fill: var(--color-blue); }'],
    ['fill-blue-50', '.fill-blue-50 { fill: var(--color-blue-50); }'],
    ['fill-white', '.fill-white { fill: var(--color-white); }'],
    ['fill-invalid', ''],
])('generates fill utilities (%s)',
    (source, expected) => testUtility(source, expected, { colors })
);

it.each([
    ['stroke-inherit', '.stroke-inherit { stroke: inherit; }'],
    ['stroke-current', '.stroke-current { stroke: currentColor; }'],
    ['stroke-transparent', '.stroke-transparent { stroke: transparent; }'],
    ['stroke-none', '.stroke-none { stroke: none; }'],
    ['stroke-blue', '.stroke-blue { stroke: var(--color-blue); }'],
    ['stroke-blue-50', '.stroke-blue-50 { stroke: var(--color-blue-50); }'],
    ['stroke-white', '.stroke-white { stroke: var(--color-white); }'],
    ['stroke-invalid', ''],
])('generates stroke utilities (%s)',
    (source, expected) => testUtility(source, expected, { colors })
);

it.each([
    ['stroke-0', '.stroke-0 { stroke-width: 0; }'],
    ['stroke-1', '.stroke-1 { stroke-width: 1; }'],
    ['stroke-1.5', '.stroke-1\\.5 { stroke-width: 1.5; }'],
    ['stroke-10', '.stroke-10 { stroke-width: 10; }'],
])('generates stroke-width utilities (%s)', testUtility);
