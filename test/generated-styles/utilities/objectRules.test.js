import testUtility from '../../utils/testUtility.js';
import { it } from "vitest";

it.each([
    ['object-contain', '.object-contain { object-fit: contain; }'],
    ['object-cover', '.object-cover { object-fit: cover; }'],
    ['object-fill', '.object-fill { object-fit: fill; }'],
    ['object-none', '.object-none { object-fit: none; }'],
    ['object-scale-down', '.object-scale-down { object-fit: scale-down; }'],
])('generates object-fit utilities (%s)', testUtility);

it.each([
    ['object-b', '.object-b { object-position: bottom; }'],
    ['object-center', '.object-center { object-position: center; }'],
    ['object-l', '.object-l { object-position: left; }'],
    ['object-lb', '.object-lb { object-position: left bottom; }'],
    ['object-lt', '.object-lt { object-position: left top; }'],
    ['object-r', '.object-r { object-position: right; }'],
    ['object-rb', '.object-rb { object-position: right bottom; }'],
    ['object-rt', '.object-rt { object-position: right top; }'],
    ['object-t', '.object-t { object-position: top; }'],
])('generates object-position utilities (%s)', testUtility);
