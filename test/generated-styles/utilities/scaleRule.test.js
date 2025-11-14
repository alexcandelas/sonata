import testUtility from '../../utils/testUtility.js';
import { it } from "vitest";

it.each([
    ['scale-none', '.scale-none {scale: none}'],
    ['scale-100', `.scale-100 {
        --sonata-scale-x: 1;
        --sonata-scale-y: 1;
        scale: var(--sonata-scale-x, 1) var(--sonata-scale-y, 1);
    }`],
    ['scale-50', `.scale-50 {
        --sonata-scale-x: 0.5; 
        --sonata-scale-y: 0.5; 
        scale: var(--sonata-scale-x, 1) var(--sonata-scale-y, 1);
    }`],
    ['scale-0', `.scale-0 {
        --sonata-scale-x: 0; 
        --sonata-scale-y: 0; 
        scale: var(--sonata-scale-x, 1) var(--sonata-scale-y, 1);
    }`],
    ['-scale-150', `.-scale-150 {
        --sonata-scale-x: -1.5; 
        --sonata-scale-y: -1.5; 
        scale: var(--sonata-scale-x, 1) var(--sonata-scale-y, 1);
    }`],
    ['scale-x-100', `.scale-x-100 {
        --sonata-scale-x: 1;
        scale: var(--sonata-scale-x, 1) var(--sonata-scale-y, 1);
    }`],
    ['scale-x-50', `.scale-x-50 {
        --sonata-scale-x: 0.5;
        scale: var(--sonata-scale-x, 1) var(--sonata-scale-y, 1);
    }`],
    ['scale-x-0', `.scale-x-0 {
        --sonata-scale-x: 0;
        scale: var(--sonata-scale-x, 1) var(--sonata-scale-y, 1);
    }`],
    ['-scale-x-150', `.-scale-x-150 {
        --sonata-scale-x: -1.5; 
        scale: var(--sonata-scale-x, 1) var(--sonata-scale-y, 1);
    }`],
    ['scale-y-100', `.scale-y-100 {
        --sonata-scale-y: 1;
        scale: var(--sonata-scale-x, 1) var(--sonata-scale-y, 1);
    }`],
    ['scale-y-50', `.scale-y-50 {
        --sonata-scale-y: 0.5;
        scale: var(--sonata-scale-x, 1) var(--sonata-scale-y, 1);
    }`],
    ['scale-y-0', `.scale-y-0 {
        --sonata-scale-y: 0;
        scale: var(--sonata-scale-x, 1) var(--sonata-scale-y, 1);
    }`],
    ['-scale-y-150', `.-scale-y-150 {
        --sonata-scale-y: -1.5; 
        scale: var(--sonata-scale-x, 1) var(--sonata-scale-y, 1);
    }`],
])('generates scale utilities (%s)', testUtility);
