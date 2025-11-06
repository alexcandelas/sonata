export default function() {
    return {
        name: 'motion-preference',
        match(matcher) {
            const match = matcher.match(/^(motion-(reduce|safe):)(.+)$/);

            if (! match) return matcher;

            let [_, __, type, property] = match;

            if (type === 'reduce' && property === 'all') return matcher;

            return {
                matcher: matcher.slice(match[1].length),
                handle: (input, next) => {
                    return next({
                        ...input,
                        parent: type === 'reduce'
                            ? `@media (prefers-reduced-motion: reduce)`
                            : `@media (prefers-reduced-motion: no-preference)`,
                    })
                }
            };
        }
    };
}
