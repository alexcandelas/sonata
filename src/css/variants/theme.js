export default function() {
    return {
        name: 'theme',
        match(matcher) {
            const match = matcher.match(/^((@?)(dark|light):).+$/);

            if (! match) return matcher;

            let [_, prefix, atRule, theme] = match;

            if (atRule) {
                return {
                    matcher: matcher.slice(prefix.length),
                    handle: (input, next) => {
                        return next({
                            ...input,
                            parent: `@media (prefers-color-scheme: ${theme})`
                        })
                    }
                };
            }

            return {
                matcher: matcher.slice(prefix.length),
                selector: s => `${s}:where(.${theme}, .${theme} *)`,
            };
        }
    };
}
