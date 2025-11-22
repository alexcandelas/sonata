import testUtility from '../../utils/testUtility.js';
import { it } from "vitest";

const config = {
    colors: {
        'red-50': '#f62027',
    },
    letterSpacing: {
        0: '0',
        1: '0.025em',
        DEFAULT: '0',
    },
    lineHeight: {
        base: 1.6,
        headings: 1.2,
        DEFAULT: 1.4,
        10: '10px',
    },
};

it.each([
    ['ls', '.ls { letter-spacing: var(--letter-spacing); }'],
    ['ls-0', '.ls-0 { letter-spacing: var(--letter-spacing-0); }'],
    ['ls-1', '.ls-1 { letter-spacing: var(--letter-spacing-1); }'],
    ['ls-2', '.ls-2 { letter-spacing: 0.5rem; }'],
    ['-ls-1', '.-ls-1 { letter-spacing: calc(var(--letter-spacing-1) * -1); }'],
    ['-ls-2', '.-ls-2 { letter-spacing: -0.5rem; }'],
    ['ls-1px', '.ls-1px { letter-spacing: 1px; }'],
    ['-ls-1px', '.-ls-1px { letter-spacing: -1px; }'],
    ['ls-0.8rem', '.ls-0\\.8rem { letter-spacing: 0.8rem; }'],
    ['ls-0.3em', '.ls-0\\.3em { letter-spacing: 0.3em; }'],
])('generates letter-spacing utilities (%s)',
    (source, expected) => testUtility(source, expected, config)
);

it.each([
    ['lh-base', '.lh-base { line-height: var(--line-height-base); }'],
    ['lh', '.lh { line-height: var(--line-height); }'],
    ['lh-headings', '.lh-headings { line-height: var(--line-height-headings); }'],
    ['lh-1', '.lh-1 { line-height: 1; }'],
    ['lh-1.8', '.lh-1\\.8 { line-height: 1.8; }'],
    ['lh-10', '.lh-10 { line-height: var(--line-height-10); }'],
    ['lh-10%', '.lh-10\\% { line-height: 10%; }'],
])('generates line-height utilities (%s)',
    (source, expected) => testUtility(source, expected, config)
);

it.each([
    ['text-start', '.text-start { text-align: start; }'],
    ['text-end', '.text-end { text-align: end; }'],
    ['text-left', '.text-left { text-align: left; }'],
    ['text-right', '.text-right { text-align: right; }'],
    ['text-center', '.text-center { text-align: center; }'],
    ['text-justify', '.text-justify { text-align: justify; }'],
])('generates line-align utilities (%s)',
    (source, expected) => testUtility(source, expected)
);

it.each([
    ['underline', '.underline { text-decoration-line: underline; }'],
    ['overline', '.overline { text-decoration-line: overline; }'],
    ['line-through', '.line-through { text-decoration-line: line-through; }'],
    ['decoration-none', '.decoration-none { text-decoration-line: none; }'],
    ['decoration-current', '.decoration-current { text-decoration-color: currentColor; }'],
    ['decoration-inherit', '.decoration-inherit { text-decoration-color: inherit; }'],
    ['decoration-transparent', '.decoration-transparent { text-decoration-color: transparent; }'],
    ['decoration-red-50', '.decoration-red-50 { text-decoration-color: var(--color-red-50); }'],
    ['decoration-solid', '.decoration-solid { text-decoration-style: solid; }'],
    ['decoration-double', '.decoration-double { text-decoration-style: double; }'],
    ['decoration-dotted', '.decoration-dotted { text-decoration-style: dotted; }'],
    ['decoration-dashed', '.decoration-dashed { text-decoration-style: dashed; }'],
    ['decoration-wavy', '.decoration-wavy { text-decoration-style: wavy; }'],
    ['decoration-auto', '.decoration-auto { text-decoration-thickness: auto; }'],
    ['decoration-from-font', '.decoration-from-font { text-decoration-thickness: from-font; }'],
    ['decoration-0', '.decoration-0 { text-decoration-thickness: 0; }'],
    ['decoration-2', '.decoration-2 { text-decoration-thickness: 2px; }'],
])('generates text-decoration utilities (%s)',
    (source, expected) => testUtility(source, expected, config)
);

it.each([
    ['normal-case', '.normal-case { text-transform: none; }'],
    ['capitalize', '.capitalize { text-transform: capitalize; }'],
    ['uppercase', '.uppercase { text-transform: uppercase; }'],
    ['lowercase', '.lowercase { text-transform: lowercase; }'],
])('generates text-transform utilities (%s)',
    (source, expected) => testUtility(source, expected)
);

it.each([
    ['underline-offset-auto', '.underline-offset-auto { text-underline-offset: auto; }'],
    ['underline-offset-0', '.underline-offset-0 { text-underline-offset: 0; }'],
    ['underline-offset-2', '.underline-offset-2 { text-underline-offset: 2px; }'],
    ['underline-offset-10%', '.underline-offset-10\\% { text-underline-offset: 10%; }'],
    ['underline-offset-1rem', '.underline-offset-1rem { text-underline-offset: 1rem; }'],
    ['-underline-offset-0.5em', '.-underline-offset-0\\.5em { text-underline-offset: -0.5em; }'],
])('generates text-underline-offset utilities (%s)',
    (source, expected) => testUtility(source, expected)
);

it.each([
    ['align-baseline', '.align-baseline { vertical-align: baseline; }'],
    ['align-sub', '.align-sub { vertical-align: sub; }'],
    ['align-super', '.align-super { vertical-align: super; }'],
    ['align-text-top', '.align-text-top { vertical-align: text-top; }'],
    ['align-text-bottom', '.align-text-bottom { vertical-align: text-bottom; }'],
    ['align-middle', '.align-middle { vertical-align: middle; }'],
    ['align-top', '.align-top { vertical-align: top; }'],
    ['align-bottom', '.align-bottom { vertical-align: bottom; }'],
])('generates vertical-align utilities (%s)',
    (source, expected) => testUtility(source, expected)
);

it.each([
    ['whitespace-normal', '.whitespace-normal { white-space: normal; }'],
    ['whitespace-pre', '.whitespace-pre { white-space: pre; }'],
    ['whitespace-pre-wrap', '.whitespace-pre-wrap { white-space: pre-wrap; }'],
    ['whitespace-pre-line', '.whitespace-pre-line { white-space: pre-line; }'],
    ['whitespace-nowrap', '.whitespace-nowrap { white-space: nowrap; }'],
    ['whitespace-break-spaces', '.whitespace-break-spaces { white-space: break-spaces; }'],
])('generates white-space utilities (%s)',
    (source, expected) => testUtility(source, expected)
);
