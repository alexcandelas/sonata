import colorFallbackFunction from '../src/visitors/colorFallbackFunction.js';
import { expect, it } from "vitest";
import { transform } from "lightningcss";

function runTokenVisitor(tokens, code) {
    return transform({
        filename: 'test.css',
        minify: true,
        code: Buffer.from(code),
        visitor: colorFallbackFunction(tokens),
    }).code.toString();
}

it('retrieves a token from the resolved configuration', () => {
    const tokens = { 'color-primary': '#502a7a' };
    const code = `p { color: colorFallback('primary') }`;

    expect(runTokenVisitor(tokens, code)).toBe('p{color:#502a7a}');
});

it('retrieves a token from the palette configuration', () => {
    const tokens = {};
    const code = `p { color: colorFallback('purple.65') }`;

    expect(runTokenVisitor(tokens, code)).toBe('p{color:oklch(44.6% .198 320)}');
});

it('accepts a color token with the `color-` prefix', () => {
    const tokens = {};
    const code = `p { color: colorFallback('color-purple-65') }`;

    expect(runTokenVisitor(tokens, code)).toBe('p{color:oklch(44.6% .198 320)}');
});

it('throws error when no argument is passed', () => {
    const code = `p { color: colorFallback() }`;

    expect(() => runTokenVisitor({}, code))
        .toThrowError(/^Sonata CSS: the colorFallback function requires a color token to search for/);
});

it('throws error when the color is not registered', () => {
    const code = `p { color: colorFallback(invalid) }`;

    expect(() => runTokenVisitor({}, code))
        .toThrowError(/^Sonata CSS: color token "invalid" is not registered/);
});
