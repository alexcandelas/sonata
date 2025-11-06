import testUtility from '../../utils/testUtility.js';
import { it } from "vitest";

const config = {
    fontFamily: {
        sans: 'Roboto, "Helvetica Neue"',
        monospace: 'monospace',
        DEFAULT: 'sans-serif',
    },
    fontSize: {
        base: '18px',
        xs: '0.65rem',
        '4': '20px',
        DEFAULT: '1rem',
    },
    fontWeight: {
        thin: 100,
        normal: 400,
        '1': 300,
        DEFAULT: 300,
    },
};

it.each([
    ['ff-sans', '.ff-sans { font-family: var(--font-family-sans); }'],
    ['ff-monospace', '.ff-monospace { font-family: var(--font-family-monospace); }'],
    ['ff', '.ff { font-family: var(--font-family); }'],
    ['ff-serif', ''],
])('generates font-family utilities (%s)',
    (source, expected) => testUtility(source, expected, config)
);

it.each([
    ['fs-base', '.fs-base { font-size: var(--font-size-base); }'],
    ['fs', '.fs { font-size: var(--font-size); }'],
    ['fs-xs', '.fs-xs { font-size: var(--font-size-xs); }'],
    ['fs-4', '.fs-4 { font-size: var(--font-size-4); }'],
    ['fs-6', '.fs-6 { font-size: 1.5rem; }'],
    ['fs-80%', '.fs-80\\% { font-size: 80%; }'],
    ['fs-15px', '.fs-15px { font-size: 15px; }'],
    ['fs-1.5rem', '.fs-1\\.5rem { font-size: 1.5rem; }'],
])('generates font-size utilities (%s)',
    (source, expected) => testUtility(source, expected, config)
);

it.each([
    ['fw-thin', '.fw-thin { font-weight: var(--font-weight-thin); }'],
    ['fw-normal', '.fw-normal { font-weight: var(--font-weight-normal); }'],
    ['fw', '.fw { font-weight: var(--font-weight); }'],
    ['fw-1', '.fw-1 { font-weight: var(--font-weight-1); }'],
    ['fw-900', '.fw-900 { font-weight: 900; }'],
])('generates font-weight utilities (%s)',
    (source, expected) => testUtility(source, expected, config)
);
