import testUtility from '../../utils/testUtility.js';
import { it } from "vitest";

it.each([
    ['grid-cols-none', '.grid-cols-none { grid-template-columns: none; }'],
    ['grid-cols-auto', '.grid-cols-auto { grid-template-columns: repeat(auto-fit, minmax(0, 1fr)); }'],
    ['grid-cols-subgrid', '.grid-cols-subgrid { grid-template-columns: subgrid; }'],
    ['grid-cols-3', '.grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }'],
    ['grid-cols-12', '.grid-cols-12 { grid-template-columns: repeat(12, minmax(0, 1fr)); }'],
    ['grid-cols-250px', '.grid-cols-250px { grid-template-columns: repeat(250px, minmax(0, 1fr)); }'],
    ['grid-cols-10%', '.grid-cols-10\\% { grid-template-columns: repeat(10%, minmax(0, 1fr)); }'],
    ['grid-cols-10.5rem', '.grid-cols-10\\.5rem { grid-template-columns: repeat(10.5rem, minmax(0, 1fr)); }'],
])('generates grid-template-columns utilities (%s)', testUtility);

it.each([
    ['grid-rows-none', '.grid-rows-none { grid-template-rows: none; }'],
    ['grid-rows-subgrid', '.grid-rows-subgrid { grid-template-rows: subgrid; }'],
    ['grid-rows-3', '.grid-rows-3 { grid-template-rows: repeat(3, minmax(0, 1fr)); }'],
    ['grid-rows-12', '.grid-rows-12 { grid-template-rows: repeat(12, minmax(0, 1fr)); }'],
    ['grid-rows-250px', '.grid-rows-250px { grid-template-rows: repeat(250px, minmax(0, 1fr)); }'],
    ['grid-rows-10%', '.grid-rows-10\\% { grid-template-rows: repeat(10%, minmax(0, 1fr)); }'],
    ['grid-rows-10.5rem', '.grid-rows-10\\.5rem { grid-template-rows: repeat(10.5rem, minmax(0, 1fr)); }'],
])('generates grid-template-rows utilities (%s)', testUtility);

it.each([
    ['col-auto', '.col-auto { grid-column: auto; }'],
    ['col-3', '.col-3 { grid-column: 3; }'],
    ['-col-1', '.-col-1 { grid-column: -1; }'],
    ['col-span-full', '.col-span-full { grid-column: 1 / -1; }'],
    ['col-span-1', '.col-span-1 { grid-column: span 1 / span 1; }'],
    ['col-span-12', '.col-span-12 { grid-column: span 12 / span 12; }'],
    ['col-span-0', ''],
])('generates grid-column utilities (%s)', testUtility);

it.each([
    ['row-auto', '.row-auto { grid-row: auto; }'],
    ['row-3', '.row-3 { grid-row: 3; }'],
    ['-row-1', '.-row-1 { grid-row: -1; }'],
    ['row-span-full', '.row-span-full { grid-row: 1 / -1; }'],
    ['row-span-1', '.row-span-1 { grid-row: span 1 / span 1; }'],
    ['row-span-12', '.row-span-12 { grid-row: span 12 / span 12; }'],
    ['row-span-0', ''],
])('generates grid-row utilities (%s)', testUtility);

it.each([
    ['col-start-auto', '.col-start-auto { grid-column-start: auto; }'],
    ['col-start-2', '.col-start-2 { grid-column-start: 2; }'],
    ['-col-start-1', '.-col-start-1 { grid-column-start: -1; }'],
    ['col-start-0', ''],
    ['-col-start-0', ''],
])('generates grid-column-start utilities (%s)', testUtility);

it.each([
    ['row-start-auto', '.row-start-auto { grid-row-start: auto; }'],
    ['row-start-2', '.row-start-2 { grid-row-start: 2; }'],
    ['-row-start-1', '.-row-start-1 { grid-row-start: -1; }'],
    ['row-start-0', ''],
    ['-row-start-0', ''],
])('generates grid-row-start utilities (%s)', testUtility);

it.each([
    ['col-end-auto', '.col-end-auto { grid-column-end: auto; }'],
    ['col-end-2', '.col-end-2 { grid-column-end: 2; }'],
    ['-col-end-1', '.-col-end-1 { grid-column-end: -1; }'],
    ['col-end-0', ''],
    ['-col-end-0', ''],
])('generates grid-column-end utilities (%s)', testUtility);

it.each([
    ['row-end-auto', '.row-end-auto { grid-row-end: auto; }'],
    ['row-end-2', '.row-end-2 { grid-row-end: 2; }'],
    ['-row-end-1', '.-row-end-1 { grid-row-end: -1; }'],
    ['row-end-0', ''],
    ['-row-end-0', ''],
])('generates grid-row-end utilities (%s)', testUtility);

it.each([
    ['grid-flow-row', '.grid-flow-row { grid-auto-flow: row; }'],
    ['grid-flow-col', '.grid-flow-col { grid-auto-flow: column; }'],
    ['grid-flow-dense', '.grid-flow-dense { grid-auto-flow: dense; }'],
    ['grid-flow-row-dense', '.grid-flow-row-dense { grid-auto-flow: row dense; }'],
    ['grid-flow-col-dense', '.grid-flow-col-dense { grid-auto-flow: column dense; }'],
])('generates grid-auto-flow utilities (%s)', testUtility);

it.each([
    ['auto-cols-auto', '.auto-cols-auto { grid-auto-columns: auto; }'],
    ['auto-cols-min', '.auto-cols-min { grid-auto-columns: min-content; }'],
    ['auto-cols-max', '.auto-cols-max { grid-auto-columns: max-content; }'],
    ['auto-cols-fr', '.auto-cols-fr { grid-auto-columns: minmax(0, 1fr); }'],
    ['auto-cols-0', '.auto-cols-0 { grid-auto-columns: 0; }'],
    ['auto-cols-0px', '.auto-cols-0px { grid-auto-columns: 0; }'],
    ['auto-cols-6', '.auto-cols-6 { grid-auto-columns: 1.5rem; }'],
    ['auto-cols-30%', '.auto-cols-30\\% { grid-auto-columns: 30%; }'],
])('generates grid-auto-columns utilities (%s)', testUtility);

it.each([
    ['auto-rows-auto', '.auto-rows-auto { grid-auto-rows: auto; }'],
    ['auto-rows-min', '.auto-rows-min { grid-auto-rows: min-content; }'],
    ['auto-rows-max', '.auto-rows-max { grid-auto-rows: max-content; }'],
    ['auto-rows-fr', '.auto-rows-fr { grid-auto-rows: minmax(0, 1fr); }'],
    ['auto-rows-0', '.auto-rows-0 { grid-auto-rows: 0; }'],
    ['auto-rows-0px', '.auto-rows-0px { grid-auto-rows: 0; }'],
    ['auto-rows-6', '.auto-rows-6 { grid-auto-rows: 1.5rem; }'],
    ['auto-rows-30%', '.auto-rows-30\\% { grid-auto-rows: 30%; }'],
])('generates grid-auto-rows utilities (%s)', testUtility);
