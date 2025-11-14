import testUtility from '../../utils/testUtility.js';
import { it } from "vitest";

it.each([
    ['scroll-p-10', '.scroll-p-10 { scroll-padding: 2.5rem }'],
    ['scroll-p-0', '.scroll-p-0 { scroll-padding: 0 }'],
    ['scroll-p-1rem', '.scroll-p-1rem { scroll-padding: 1rem }'],
    ['scroll-p-5%', '.scroll-p-5\\% { scroll-padding: 5% }'],
    ['scroll-pt-6', '.scroll-pt-6 { scroll-padding-top: 1.5rem }'],
    ['-scroll-pt-1px', '.-scroll-pt-1px { scroll-padding-top: -1px }'],
    ['scroll-pb-4', '.scroll-pb-4 { scroll-padding-bottom: 1rem }'],
    ['scroll-pl-2.5cm', '.scroll-pl-2\\.5cm { scroll-padding-left: 2.5cm }'],
    ['scroll-pr-0', '.scroll-pr-0 { scroll-padding-right: 0 }'],
    ['scroll-px-2', '.scroll-px-2 { scroll-padding-inline: 0.5rem }'],
    ['-scroll-px-10px', '.-scroll-px-10px { scroll-padding-inline: -10px }'],
    ['-scroll-py-4', '.-scroll-py-4 { scroll-padding-block: -1rem; }'],
    ['scroll-pbs-0', '.scroll-pbs-0 { scroll-padding-block-start: 0 }'],
    ['scroll-pbe-4', '.scroll-pbe-4 { scroll-padding-block-end: 1rem }'],
    ['scroll-pis-4', '.scroll-pis-4 { scroll-padding-inline-start: 1rem }'],
    ['scroll-pie-4', '.scroll-pie-4 { scroll-padding-inline-end: 1rem }'],
])('generates `scroll-padding` utilities (%s)', testUtility);
