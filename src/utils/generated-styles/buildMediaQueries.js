import { breakpointOrNumeric } from './breakpointOrNumeric.js';

let registeredBreakpoints;

/**
 * Build the range media feature.
 *
 * @param {boolean} isRanged - Whether the query is a ranged query (e.g. 600<1000:m-4).
 * @param {string} widthOrSymbol - A '<' symbol for single queries, or a breakpoint/value for ranged queries.
 * @param {string} endWidth - A breakpoint or numeric value.
 * @returns {string}
 */
function resolveQueryFeature(isRanged, widthOrSymbol, endWidth) {
    endWidth = breakpointOrNumeric(endWidth, registeredBreakpoints);

    if (isRanged) {
        const startWidth = breakpointOrNumeric(widthOrSymbol, registeredBreakpoints);
        return `(${startWidth} <= width < ${endWidth})`;
    }

    const isMaxWidth = widthOrSymbol === '<';

    return isMaxWidth
        ? `(width < ${endWidth})`
        : `(width >= ${endWidth})`;
}

/**
 * Handle a width-based media query for the given at-rule.
 *
 * @param {Object} options
 * @param {string} options.originalMatcher - The original matcher string (e.g., "<md:m-4").
 * @param {Array} options.match - The match result from a regex pattern.
 * @param {Object} options.breakpoints - An object of registered breakpoints.
 * @param {boolean} options.isRanged - Whether the query is a ranged one (e.g., 400<800).
 * @param {string} options.atRule - The rule to use (e.g., "@media", "@container" or "@container named").
 * @returns {Object}
 */
export function buildWidthMediaQuery({ originalMatcher, match, breakpoints, isRanged, atRule }) {
    registeredBreakpoints = breakpoints;

    const [_, capture, widthOrSymbol, endWidth] = match;
    const value = resolveQueryFeature(isRanged, widthOrSymbol, endWidth);

    return {
        matcher: originalMatcher.slice(capture.length),
        handle: (input, next) => {
            return next({
                ...input,
                parent: `${atRule} ${value}`
            })
        }
    };
}
