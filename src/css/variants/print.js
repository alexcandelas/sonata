export default function() {
    return {
        name: 'print',
        match(matcher) {
            const match = matcher.match(/^(print:).+$/);

            if (! match) return matcher;

            return {
                matcher: matcher.slice(match[1].length),
                handle: (input, next) => {
                    return next({
                        ...input,
                        parent: `@media print`
                    })
                }
            };
        }
    };
}
