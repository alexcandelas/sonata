import testUtility from '../../utils/testUtility.js';
import { it } from "vitest";

it.each([
    ['p-4', '.p-4 {padding: 1rem;}'],
    ['-p-6', '.-p-6 {padding: -1.5rem;}'],
    ['p-20rem', '.p-20rem {padding: 20rem;}'],
    ['p-10px', '.p-10px {padding: 10px;}'],
    ['-p-3cm', '.-p-3cm {padding: -3cm;}'],
    ['p-25%', '.p-25\\% {padding: 25%;}'],
    ['p-container', '.p-container {padding: var(--container-padding);}'],
    ['-p-container', '.-p-container {padding: calc(var(--container-padding) * -1);}'],
    ['p-4foo', '']
])('generates paddings (%s)', testUtility);

it.each([
    ['-pt-1px', '.-pt-1px {padding-top: -1px;}'],
    ['pb-4', '.pb-4 {padding-bottom: 1rem;}'],
    ['pl-2.5cm', '.pl-2\\.5cm {padding-left: 2.5cm;}'],
    ['pr-0', '.pr-0 {padding-right: 0;}'],
    ['px-2', '.px-2 {padding-inline: 0.5rem;}'],
    ['-py-4', '.-py-4 {padding-block: -1rem; }'],
    ['pbs-0', '.pbs-0 {padding-block-start: 0;}'],
    ['pbe-4', '.pbe-4 {padding-block-end: 1rem;}'],
    ['pis-4', '.pis-4 {padding-inline-start: 1rem;}'],
    ['pie-4', '.pie-4 {padding-inline-end: 1rem;}'],
    ['px-container', '.px-container {padding-inline: var(--container-padding)}'],
    ['-px-container', '.-px-container {padding-inline: calc(var(--container-padding) * -1)}'],
])('generates directional paddings (%s)', testUtility);
