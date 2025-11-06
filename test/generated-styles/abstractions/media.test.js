import testUtility from '../../utils/testUtility.js';
import { it } from "vitest";

it.each([
    ['media', `
        .media {
            display: flex;
            gap: 2rem;
        }
    
        .media > * {
            flex: 1;
        }
    
        .media__img,
        .media :is(canvas, embed, figure, img, picture, svg, video) {
            flex: none;
        }
    `],
])('generates media abstraction (%s)', testUtility);
