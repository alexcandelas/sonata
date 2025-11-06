import testUtility from '../../utils/testUtility.js';
import { it } from "vitest";

const config = {
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
    ['normal-case', '.normal-case { text-transform: none; }'],
    ['capitalize', '.capitalize { text-transform: capitalize; }'],
    ['uppercase', '.uppercase { text-transform: uppercase; }'],
    ['lowercase', '.lowercase { text-transform: lowercase; }'],
])('generates text-transform utilities (%s)',
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
    ['whitespace-normal', '.whitespace-normal { whitespace: normal; }'],
    ['whitespace-pre', '.whitespace-pre { whitespace: pre; }'],
    ['whitespace-pre-wrap', '.whitespace-pre-wrap { whitespace: pre-wrap; }'],
    ['whitespace-pre-line', '.whitespace-pre-line { whitespace: pre-line; }'],
    ['whitespace-nowrap', '.whitespace-nowrap { whitespace: nowrap; }'],
    ['whitespace-break-spaces', '.whitespace-break-spaces { whitespace: break-spaces; }'],
])('generates white-space utilities (%s)',
    (source, expected) => testUtility(source, expected)
);
