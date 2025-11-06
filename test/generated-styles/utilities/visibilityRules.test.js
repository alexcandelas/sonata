import testUtility from '../../utils/testUtility.js';
import { it } from "vitest";

it.each([
    ['visible', '.visible { visibility: visible; }'],
    ['invisible', '.invisible { visibility: hidden; }'],
    ['collapse', '.collapse { visibility: collapse; }'],
])('generates visibility utilities (%s)', testUtility);
