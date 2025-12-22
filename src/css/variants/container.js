import { buildWidthMediaQuery } from '../../utils/generated-styles/buildMediaQueries.js';

export default function (breakpoints) {
    const joinedBreakpoints = Object.keys(breakpoints).join('|');
    const valueCapture = `(${joinedBreakpoints}|\\d+)(?:px)?`;
    const nameCapture = '(?:\\/([\\w-]+))?';

    return {
        name: 'container',
        match(matcher) {
            // Match a container query variant using a registered breakpoint or numeric value
            // Examples: @<lg:m-4, @800px:m-4, @<1000:m-4
            const singleMatch = matcher.match(new RegExp(`^(@(<?)${valueCapture}${nameCapture}:).+$`));
            let containerName = singleMatch?.[4];

            if (singleMatch) {
                return buildWidthMediaQuery({
                    originalMatcher: matcher,
                    match: singleMatch,
                    breakpoints,
                    isRanged: false,
                    atRule: '@container' + (containerName ? ` ${containerName}` : ''),
                }, 100);
            }


            // Match a range container query using registered breakpoints or numeric values
            // Examples: @sm<lg:m-4, @400px<700px:m-4, @400<lg:m-4
            const rangedMatch = matcher.match(new RegExp(`^(@${valueCapture}<${valueCapture}${nameCapture}:).+$`));
            containerName = rangedMatch?.[4];

            if (rangedMatch) {
                return buildWidthMediaQuery({
                    originalMatcher: matcher,
                    match: rangedMatch,
                    breakpoints,
                    isRanged: true,
                    atRule: '@container' + (containerName ? ` ${containerName}` : ''),
                }, 100);
            }

            return matcher;
        }
    };
}
