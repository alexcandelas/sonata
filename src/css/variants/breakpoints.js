import { buildWidthMediaQuery } from '../../utils/generated-styles/buildMediaQueries.js';

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
                return buildWidthMediaQuery({
                    originalMatcher: matcher,
                    match: singleMatch,
                    breakpoints,
                    isRanged: false,
                    atRule: '@media',
                });
            }


            // Match a range media query using registered breakpoints or numeric values
            // Examples: sm<lg:m-4, 400px<700px:m-4, 400<lg:m-4
            const rangedMatch = matcher.match(new RegExp(`^(${valueCapture}<${valueCapture}:).+$`));

            if (rangedMatch) {
                return buildWidthMediaQuery({
                    originalMatcher: matcher,
                    match: rangedMatch,
                    breakpoints,
                    isRanged: true,
                    atRule: '@media',
                });
            }

            return matcher;
        }
    };
}
