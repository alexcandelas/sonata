export default function buildMediaQueriesMap(breakpoints) {
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
};
