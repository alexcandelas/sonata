export default function() {
    return {
        name: 'root',
        match(matcher) {
            if (matcher.match(/^root:.+$/)) {
                return {
                    matcher: matcher.slice(5),
                    selector: s => `:root:where(:has(${s}))`,
                };
            }

            return matcher;
        }
    };
}
