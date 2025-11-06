import testUtility from '../../utils/testUtility.js';
import { it } from "vitest";

const config = {
    radius: {
        'md': '0.5rem',
        'lg': '1rem',
        '5': '50px',
        DEFAULT: '0.5rem',
    },
    colors: {
        'primary': '#502a7a',
        'red-20': '#ffd8d3',
        'red-50': '#f62025',
    },
};

it.each([
    ['radius', '.radius { border-radius: var(--radius); }'],
    ['radius-md', '.radius-md { border-radius: var(--radius-md); }'],
    ['radius-lg', '.radius-lg { border-radius: var(--radius-lg); }'],
    ['radius-full', '.radius-full { border-radius: 9999px; }'],
    ['radius-t-full', '.radius-t-full { border-top-left-radius: 9999px; border-top-right-radius: 9999px; }'],
    ['radius-0', '.radius-0 { border-radius: 0; }'],
    ['radius-7', '.radius-7 { border-radius: 1.75rem; }'],
    ['radius-5', '.radius-5 { border-radius: var(--radius-5); }'],
    ['radius-2rem', '.radius-2rem { border-radius: 2rem; }'],
    ['radius-t-10px', '.radius-t-10px { border-top-left-radius: 10px; border-top-right-radius: 10px; }'],
    ['radius-b', '.radius-b { border-bottom-left-radius: var(--radius); border-bottom-right-radius: var(--radius); }'],
    ['radius-l-lg', '.radius-l-lg { border-top-left-radius: var(--radius-lg); border-bottom-left-radius: var(--radius-lg); }'],
    ['radius-r-0', '.radius-r-0 { border-top-right-radius: 0; border-bottom-right-radius: 0; }'],
    ['radius-r-5', '.radius-r-5 { border-top-right-radius: var(--radius-5); border-bottom-right-radius: var(--radius-5); }'],
])('generates border-radius utilities (%s)',
    (source, expected) => testUtility(source, expected, config)
);

it.each([
    ['b-1', '.b-1 { border-width: 1px; }'],
    ['b-0', '.b-0 { border-width: 0; }'],
    ['b-1.5rem', '.b-1\\.5rem { border-width: 1.5rem; }'],
    ['bt-0', '.bt-0 { border-top-width: 0; }'],
    ['bt-1', '.bt-1 { border-top-width: 1px; }'],
    ['br-0', '.br-0 { border-right-width: 0; }'],
    ['br-1.5em', '.br-1\\.5em { border-right-width: 1.5em; }'],
    ['bb-0', '.bb-0 { border-bottom-width: 0; }'],
    ['bb-5%', '.bb-5\\% { border-bottom-width: 5%; }'],
    ['bl-0', '.bl-0 { border-left-width: 0; }'],
    ['bl-10vw', '.bl-10vw { border-left-width: 10vw; }'],
    ['bx-0', '.bx-0 { border-inline-width: 0; }'],
    ['bx-2', '.bx-2 { border-inline-width: 2px; }'],
    ['bx-1.5cm', '.bx-1\\.5cm { border-inline-width: 1.5cm; }'],
    ['by-0', '.by-0 { border-block-width: 0; }'],
    ['by-4', '.by-4 { border-block-width: 4px; }'],
    ['by-2mm', '.by-2mm { border-block-width: 2mm; }'],
])('generates border-width utilities (%s)', testUtility);

it.each([
    ['b-inherit', '.b-inherit { border-color: inherit; }'],
    ['b-transparent', '.b-transparent { border-color: transparent; }'],
    ['b-current', '.b-current { border-color: currentColor; }'],
    ['b-primary', '.b-primary { border-color: var(--color-primary); }'],
    ['b-red-20', '.b-red-20 { border-color: var(--color-red-20); }'],
    ['b-red-50', '.b-red-50 { border-color: var(--color-red-50); }'],
    ['bx-inherit', '.bx-inherit { border-inline-color: inherit; }'],
    ['bx-primary', '.bx-primary { border-inline-color: var(--color-primary); }'],
    ['by-transparent', '.by-transparent { border-block-color: transparent; }'],
    ['by-red-20', '.by-red-20 { border-block-color: var(--color-red-20); }'],
    ['bt-current', '.bt-current { border-top-color: currentColor; }'],
    ['bt-red-50', '.bt-red-50 { border-top-color: var(--color-red-50); }'],
    ['br-inherit', '.br-inherit { border-right-color: inherit; }'],
    ['br-primary', '.br-primary { border-right-color: var(--color-primary); }'],
    ['bb-transparent', '.bb-transparent { border-bottom-color: transparent; }'],
    ['bb-red-20', '.bb-red-20 { border-bottom-color: var(--color-red-20); }'],
    ['bl-current', '.bl-current { border-left-color: currentColor; }'],
    ['bl-red-50', '.bl-red-50 { border-left-color: var(--color-red-50); }'],
])('generates border-color utilities (%s)',
    (source, expected) => testUtility(source, expected, config)
);
