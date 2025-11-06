import testUtility from '../../utils/testUtility.js';
import { it } from "vitest";

it.each([
    ['opacity-0', '.opacity-0 {opacity: 0;}'],
    ['opacity-1', '.opacity-1 {opacity: 0.01;}'],
    ['opacity-50', '.opacity-50 {opacity: 0.5;}'],
    ['opacity-100', '.opacity-100 {opacity: 1;}'],
])('generates opacity utilities (%s)', testUtility);
