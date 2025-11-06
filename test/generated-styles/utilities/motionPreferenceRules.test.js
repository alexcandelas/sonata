import testUtility from '../../utils/testUtility.js';
import { it } from "vitest";

it.each([
    [
        'motion-reduce:all',
        `@media (prefers-reduced-motion: reduce) {
            .motion-reduce\\:all {
                animation-delay: -1ms;
                animation-duration: 1ms;
                animation-iteration-count: 1;
                background-attachment: initial;
                scroll-behavior: auto;
                transition-delay: 0s;
                transition-duration: 0s;
            }
        }`
    ],
])('generates motion preference utilities (%s)', testUtility);
