import testUtility from '../../utils/testUtility.js';
import { it } from "vitest";

it.each([
    ['static', '.static { position: static; }'],
    ['relative', '.relative { position: relative; }'],
    ['absolute', '.absolute { position: absolute; }'],
    ['fixed', '.fixed { position: fixed; }'],
    ['sticky', '.sticky { position: sticky; }'],
])('generates position utilities (%s)', testUtility);

it.each([
    ['right-auto', '.right-auto { right: auto; }'],
    ['left-10px', '.left-10px { left: 10px; }'],
    ['-top-1px', '.-top-1px { top: -1px; }'],
    ['right-2.5rem', '.right-2\\.5rem { right: 2.5rem; }'],
    ['bottom-4', '.bottom-4 { bottom: 1rem; }'],
    ['-top-4', '.-top-4 { top: -1rem; }'],
    ['left-25%', '.left-25\\% { left: 25%; }'],
    ['inset-auto', '.inset-auto { inset: auto; }'],
    ['inset-5%', '.inset-5\\% { inset: 5%; }'],
    ['-inset-4', '.-inset-4 { inset: -1rem; }'],
    ['-inset-1px', '.-inset-1px { inset: -1px; }'],
    ['inset-x-auto', '.inset-x-auto { left: auto; right: auto; }'],
    ['inset-x-1rem', '.inset-x-1rem { left: 1rem; right: 1rem; }'],
    ['-inset-y-1px', '.-inset-y-1px { bottom: -1px; top: -1px; }'],
    ['inset-inline-auto', '.inset-inline-auto { inset-inline: auto; }'],
    ['inset-inline-2rem', '.inset-inline-2rem { inset-inline: 2rem; }'],
    ['-inset-block-2.5%', '.-inset-block-2\\.5\\% { inset-block: -2.5%; }'],
    ['inset-bs-0', '.inset-bs-0 {inset-block-start: 0;}'],
    ['inset-be-4', '.inset-be-4 {inset-block-end: 1rem;}'],
    ['inset-is-4px', '.inset-is-4px {inset-inline-start: 4px;}'],
    ['-inset-ie-4', '.-inset-ie-4 {inset-inline-end: -1rem;}'],
])('generates placement utilities (%s)', testUtility);

it.each([
    ['content-normal', '.content-normal { align-content: normal; }'],
    ['content-stretch', '.content-stretch { align-content: stretch; }'],
    ['content-baseline', '.content-baseline { align-content: baseline; }'],
    ['content-center', '.content-center { align-content: center; }'],
    ['content-start', '.content-start { align-content: flex-start; }'],
    ['content-end', '.content-end { align-content: flex-end; }'],
    ['content-between', '.content-between { align-content: flex-space-between; }'],
    ['content-around', '.content-around { align-content: flex-space-around; }'],
    ['content-evenly', '.content-evenly { align-content: flex-space-evenly; }'],
])('generates align-content utilities (%s)', testUtility);

it.each([
    ['items-stretch', '.items-stretch { align-items: stretch; }'],
    ['items-baseline', '.items-baseline { align-items: baseline; }'],
    ['items-center', '.items-center { align-items: center; }'],
    ['items-start', '.items-start { align-items: flex-start; }'],
    ['items-end', '.items-end { align-items: flex-end; }'],
])('generates align-items utilities (%s)', testUtility);

it.each([
    ['self-auto', '.self-auto { align-self: auto; }'],
    ['self-stretch', '.self-stretch { align-self: stretch; }'],
    ['self-baseline', '.self-baseline { align-self: baseline; }'],
    ['self-center', '.self-center { align-self: center; }'],
    ['self-start', '.self-start { align-self: flex-start; }'],
    ['self-end', '.self-end { align-self: flex-end; }'],
])('generates align-self utilities (%s)', testUtility);

it.each([
    ['justify-normal', '.justify-normal { justify-content: normal; }'],
    ['justify-stretch', '.justify-stretch { justify-content: stretch; }'],
    ['justify-center', '.justify-center { justify-content: center; }'],
    ['justify-start', '.justify-start { justify-content: flex-start; }'],
    ['justify-end', '.justify-end { justify-content: flex-end; }'],
    ['justify-between', '.justify-between { justify-content: space-between; }'],
    ['justify-around', '.justify-around { justify-content: space-around; }'],
    ['justify-evenly', '.justify-evenly { justify-content: space-evenly; }'],
])('generates justify-content utilities (%s)', testUtility);

it.each([
    ['justify-items-normal', '.justify-items-normal { justify-items: normal; }'],
    ['justify-items-stretch', '.justify-items-stretch { justify-items: stretch; }'],
    ['justify-items-center', '.justify-items-center { justify-items: center; }'],
    ['justify-items-start', '.justify-items-start { justify-items: start; }'],
    ['justify-items-end', '.justify-items-end { justify-items: end; }'],
    ['justify-items-left', '.justify-items-left { justify-items: left; }'],
    ['justify-items-right', '.justify-items-right { justify-items: right; }'],
])('generates justify-items utilities (%s)', testUtility);

it.each([
    ['justify-self-auto', '.justify-self-auto { justify-self: auto; }'],
    ['justify-self-stretch', '.justify-self-stretch { justify-self: stretch; }'],
    ['justify-self-center', '.justify-self-center { justify-self: center; }'],
    ['justify-self-start', '.justify-self-start { justify-self: start; }'],
    ['justify-self-end', '.justify-self-end { justify-self: end; }'],
    ['justify-self-left', '.justify-self-left { justify-self: left; }'],
    ['justify-self-right', '.justify-self-right { justify-self: right; }'],
])('generates justify-self utilities (%s)', testUtility);

it.each([
    ['place-content-stretch', '.place-content-stretch { place-content: stretch; }'],
    ['place-content-center', '.place-content-center { place-content: center; }'],
    ['place-content-start', '.place-content-start { place-content: start; }'],
    ['place-content-end', '.place-content-end { place-content: end; }'],
    ['place-content-between', '.place-content-between { place-content: space-between; }'],
    ['place-content-around', '.place-content-around { place-content: space-around; }'],
    ['place-content-evenly', '.place-content-evenly { place-content: space-evenly; }'],
])('generates place-content utilities (%s)', testUtility);

it.each([
    ['place-items-stretch', '.place-items-stretch { place-items: stretch; }'],
    ['place-items-center', '.place-items-center { place-items: center; }'],
    ['place-items-start', '.place-items-start { place-items: start; }'],
    ['place-items-end', '.place-items-end { place-items: end; }'],
])('generates place-items utilities (%s)', testUtility);
