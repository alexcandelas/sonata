import testUtility from '../../utils/testUtility.js';
import { it } from "vitest";

it.each([
    ['break-before-all', '.break-before-all { break-before: all; }'],
    ['break-before-auto', '.break-before-auto { break-before: auto; }'],
    ['break-before-avoid', '.break-before-avoid { break-before: avoid; }'],
    ['break-before-avoid-page', '.break-before-avoid-page { break-before: avoid-page; }'],
    ['break-before-column', '.break-before-column { break-before: column; }'],
    ['break-before-left', '.break-before-left { break-before: left; }'],
    ['break-before-page', '.break-before-page { break-before: page; }'],
    ['break-before-right', '.break-before-right { break-before: right; }'],
    ['break-before-', ''],
    ['break-before-invalid-rule', ''],
])('generates break-before utilities (%s)', testUtility);

it.each([
    ['break-after-all', '.break-after-all { break-after: all; }'],
    ['break-after-auto', '.break-after-auto { break-after: auto; }'],
    ['break-after-avoid', '.break-after-avoid { break-after: avoid; }'],
    ['break-after-avoid-page', '.break-after-avoid-page { break-after: avoid-page; }'],
    ['break-after-column', '.break-after-column { break-after: column; }'],
    ['break-after-left', '.break-after-left { break-after: left; }'],
    ['break-after-page', '.break-after-page { break-after: page; }'],
    ['break-after-right', '.break-after-right { break-after: right; }'],
    ['break-after-', ''],
    ['break-after-invalid-rule', ''],
])('generates break-after utilities (%s)', testUtility);

it.each([
    ['break-inside-auto', '.break-inside-auto { break-inside: auto; }'],
    ['break-inside-avoid', '.break-inside-avoid { break-inside: avoid; }'],
    ['break-inside-avoid-column', '.break-inside-avoid-column { break-inside: avoid-column; }'],
    ['break-inside-avoid-page', '.break-inside-avoid-page { break-inside: avoid-page; }'],
    ['break-inside-', ''],
    ['break-inside-column', ''],
])('generates break-inside utilities (%s)', testUtility);
