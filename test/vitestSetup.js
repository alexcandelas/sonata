import { expect } from 'vitest';

function replaceCss(str) {
    return str.replace(/\s/g, '')
        .replaceAll(';}', '}');
}

expect.extend({
    toMatchCss(received, expected) {
        received = replaceCss(received);
        expected = replaceCss(expected);

        return {
            pass: received === expected,
            message: () => `AssertionError: expected '${received}' to be '${expected}'`,
            expected,
            actual: received,
        }
    }
})
