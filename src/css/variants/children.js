export default function() {
    return {
        name: 'children',
        match(matcher) {
            if (matcher.match(/^\*:.+$/)) {
                return {
                    matcher: matcher.slice(2),
                    selector: s => `${s} > *`,
                };
            }

            return matcher;
        }
    };
}
