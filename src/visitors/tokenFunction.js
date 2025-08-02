/**
 * Retrieve the given token value from the resolved configuration.
 *
 * @returns {string}
 */
export default function token(tokens) {
    return {
        Function: {
            'token'(fn) {
                const param = fn.arguments[0]?.value.value;

                if (! param) {
                    throw new Error(`Sonata CSS: the token function requires a key to search for.`);
                }

                const value = tokens[param];

                if (value) return { raw: value };

                throw new Error(`Sonata CSS: the token "${param}" does not exist.`);
            }
        }
    };
}
