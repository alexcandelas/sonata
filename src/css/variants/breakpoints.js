import { breakpointOrNumeric } from '../../utils/generated-styles/breakpointOrNumeric.js';
import { buildWidthMediaQuery } from '../../utils/generated-styles/buildMediaQueries.js';

function resolveOrder(value = '1', registeredBreakpoints) {
    return parseInt(
        breakpointOrNumeric(value, registeredBreakpoints)
    ) / 10000;
}

export default function (breakpoints) {
    const joinedBreakpoints = Object.keys(breakpoints).join('|');
    const valueCapture = `(${joinedBreakpoints}|\\d+)(?:px)?`;

    return {
        name: 'breakpoints',
        match(matcher) {
            // Match a media query variant using a registered breakpoint or numeric value
            // Examples: <lg:m-4, 800px:m-4, <1000:m-4
            const singleMatch = matcher.match(new RegExp(`^((<?)${valueCapture}:).+$`));

            if (singleMatch) {
                const order = 1 + resolveOrder(singleMatch[3], breakpoints);

                return buildWidthMediaQuery({
                    originalMatcher: matcher,
                    match: singleMatch,
                    breakpoints,
                    isRanged: false,
                    atRule: '@media',
                }, order);
            }


            // Match a range media query using registered breakpoints or numeric values
            // Examples: sm<lg:m-4, 400px<700px:m-4, 400<lg:m-4
            const rangedMatch = matcher.match(new RegExp(`^(${valueCapture}<${valueCapture}:).+$`));

            if (rangedMatch) {
                const order = 1 + resolveOrder(rangedMatch[2], breakpoints);

                return buildWidthMediaQuery({
                    originalMatcher: matcher,
                    match: rangedMatch,
                    breakpoints,
                    isRanged: true,
                    atRule: '@media',
                }, order);
            }

            return matcher;
        }
    };
}
