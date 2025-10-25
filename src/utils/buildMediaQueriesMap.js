/**
 * Build a map of `max-width` and `min-width` media queries
 * with the given breakpoints.
 *
 * @param {Object} breakpoints
 * @returns {Array<{prefix:string,query:string}>}
 */
export function buildMediaQueriesMap(breakpoints) {
    let map = [];

    for (const prefix in breakpoints) {
        map.push(
            {
                prefix: '<' + prefix,
                query: `(max-width: ${(breakpoints[prefix] - .1)}px)`
            },
            {
                prefix,
                query: `(min-width: ${breakpoints[prefix]}px)`
            }
        );
    }

    return map;
}
