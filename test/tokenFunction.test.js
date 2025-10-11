import inlineSvgFunction from '../src/visitors/inlineSvgFunction.js';
import tokenFunction from '../src/visitors/tokenFunction.js';
import { encodeSvg } from '../src/utils/encodeSvg.js';
import { expect, it } from "vitest";
import { transform } from "lightningcss";

function encodeForTest(svgCode) {
    return encodeSvg(svgCode).replace(/"/g, '\\"');
}

function runTokenVisitor(tokens, code) {
    return transform({
        filename: 'test.css',
        minify: true,
        code: Buffer.from(code),
        visitor: tokenFunction(tokens),
    }).code.toString();
}

function runSvgVisitor(code) {
    return transform({
        filename: 'test.css',
        minify: true,
        code: Buffer.from(code),
        visitor: inlineSvgFunction('test.css'),
    }).code.toString();
}

it('retrieves a token', () => {
    const tokens = { 'color-primary': '#502a7a' };
    const code = `p { color: token(color-primary) }`;

    expect(runTokenVisitor(tokens, code)).toBe('p{color:#502a7a}');
});

it('can be used when loading a SVG', () => {
    const tokens = { 'color-primary': '#502a7a' };
    const code = `
        p {
            background: inline-svg("<svg><circle cx='12' cy='12' r='8'/></svg>", stroke: token(color-primary));
        }
    `;

    expect(runSvgVisitor(runTokenVisitor(tokens, code))).toBe(
        'p{background:url("data:image/svg+xml;charset=utf-8,'
        + encodeForTest('<svg stroke="#502a7a"><circle cx="12" cy="12" r="8"/></svg>') + '")}'
    );
});

it('throws error when no argument is passed', () => {
    const code = `p { color: token() }`;

    expect(() => runTokenVisitor({}, code))
        .toThrowError(/^Sonata CSS: the token function requires a key to search for/);
});

it('throws error when the token does not exist', () => {
    const code = `p { color: token(invalid) }`;

    expect(() => runTokenVisitor({}, code))
        .toThrowError(/^Sonata CSS: the token "invalid" does not exist/);
});
