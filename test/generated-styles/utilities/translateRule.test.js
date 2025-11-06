import testUtility from '../../utils/testUtility.js';
import { it } from "vitest";

it.each([
    ['translate-none', '.translate-none { translate: none; }'],
    ['translate-full', `.translate-full {
        --sonata-translate-x: 100%;
        --sonata-translate-y: 100%;
        translate: var(--sonata-translate-x, 0) var(--sonata-translate-y, 0);
    }`],
    ['translate-1/3', `.translate-1\\/3 {
        --sonata-translate-x: calc(1/3 * 100%);
        --sonata-translate-y: calc(1/3 * 100%);
        translate: var(--sonata-translate-x, 0) var(--sonata-translate-y, 0);
    }`],
    ['-translate-1/2', `.-translate-1\\/2 {
        --sonata-translate-x: calc(1/2 * -100%);
        --sonata-translate-y: calc(1/2 * -100%);
        translate: var(--sonata-translate-x, 0) var(--sonata-translate-y, 0);
    }`],
    ['-translate-1px', `.-translate-1px {
        --sonata-translate-x: -1px;
        --sonata-translate-y: -1px;
        translate: var(--sonata-translate-x, 0) var(--sonata-translate-y, 0);
    }`],
    ['translate-6', `.translate-6 {
        --sonata-translate-x: 1.5rem;
        --sonata-translate-y: 1.5rem;
        translate: var(--sonata-translate-x, 0) var(--sonata-translate-y, 0);
    }`],
    ['-translate-x-1px', `.-translate-x-1px {
        --sonata-translate-x: -1px;
        translate: var(--sonata-translate-x, 0) var(--sonata-translate-y, 0);
    }`],
    ['translate-x-1/10', `.translate-x-1\\/10 {
        --sonata-translate-x: calc(1/10 * 100%);
        translate: var(--sonata-translate-x, 0) var(--sonata-translate-y, 0);
    }`],
    ['translate-y-10%', `.translate-y-10\\% {
        --sonata-translate-y: 10%;
        translate: var(--sonata-translate-x, 0) var(--sonata-translate-y, 0);
    }`],
    ['-translate-y-2rem', `.-translate-y-2rem {
        --sonata-translate-y: -2rem;
        translate: var(--sonata-translate-x, 0) var(--sonata-translate-y, 0);
    }`],
    ['translate-z-10', `.translate-z-10 {
        --sonata-translate-z: 2.5rem;
        translate: var(--sonata-translate-x, 0) var(--sonata-translate-y, 0) var(--sonata-translate-z, 0);
    }`],
    ['-translate-z-20px', `.-translate-z-20px {
        --sonata-translate-z: -20px;
        translate: var(--sonata-translate-x, 0) var(--sonata-translate-y, 0) var(--sonata-translate-z, 0);
    }`],
])('generates translate utilities (%s)', testUtility);
