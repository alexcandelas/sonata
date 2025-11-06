import testUtility from '../../utils/testUtility.js';
import { it } from "vitest";

it.each([
    ['overflow-auto', '.overflow-auto { overflow: auto; }'],
    ['overflow-hidden', '.overflow-hidden { overflow: hidden; }'],
    ['overflow-clip', '.overflow-clip { overflow: clip; }'],
    ['overflow-visible', '.overflow-visible { overflow: visible; }'],
    ['overflow-scroll', '.overflow-scroll { overflow: scroll; }'],
    ['overflow-x-auto', '.overflow-x-auto { overflow-x: auto; }'],
    ['overflow-x-hidden', '.overflow-x-hidden { overflow-x: hidden; }'],
    ['overflow-x-clip', '.overflow-x-clip { overflow-x: clip; }'],
    ['overflow-x-visible', '.overflow-x-visible { overflow-x: visible; }'],
    ['overflow-x-scroll', '.overflow-x-scroll { overflow-x: scroll; }'],
    ['overflow-y-auto', '.overflow-y-auto { overflow-y: auto; }'],
    ['overflow-y-hidden', '.overflow-y-hidden { overflow-y: hidden; }'],
    ['overflow-y-clip', '.overflow-y-clip { overflow-y: clip; }'],
    ['overflow-y-visible', '.overflow-y-visible { overflow-y: visible; }'],
    ['overflow-y-scroll', '.overflow-y-scroll { overflow-y: scroll; }'],
])('generates overflow utilities (%s)', testUtility);
