import testUtility from '../../utils/testUtility.js';
import { it } from "vitest";

it.each([
    ['container', `.container { 
        margin-inline: auto;
        max-width: var(--container-width, 80rem);
        padding-inline: var(--container-padding);
        width: 100%;
    }`],
    ['fluid-container', `.fluid-container { 
        padding-inline: var(--container-padding);
        width: 100%;
    }`],
])('generates container abstractions (%s)', testUtility);
