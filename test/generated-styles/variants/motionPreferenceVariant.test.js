import testUtility from '../../utils/testUtility.js';
import { it } from "vitest";

it.each([
    [
        'motion-reduce:-transition-delay-1ms',
        `@media (prefers-reduced-motion: reduce) {
            .motion-reduce\\:-transition-delay-1ms { transition-delay: -1ms; }
        }`
    ],
    [
        'motion-safe:transition-250',
        `@media (prefers-reduced-motion: no-preference) {
            .motion-safe\\:transition-250 { transition-duration: 250ms; }
        }`
    ],
])('generates motion preference variants (%s)', testUtility);
