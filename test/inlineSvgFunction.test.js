import inlineSvgFunction from '../src/visitors/inlineSvgFunction.js';
import { describe, expect, it } from "vitest";
import { encodeSvg } from '../src/utils/encodeSvg.js';
import { transform } from "lightningcss";

const encodedSuccessSvg = 'data:image/svg+xml;charset=utf-8,' + encodeForTest('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m7.2 12.3 2.9 2.9 6.6-6.6"/><circle cx="12" cy="12" r="9"/></svg>');
const encodedTestSvg = 'data:image/svg+xml;charset=utf-8,' + encodeForTest('<svg xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="8"/></svg>');

function encodeForTest(svgCode) {
    return encodeSvg(svgCode).replace(/"/g, '\\"');
}

function runVisitor(code) {
    return transform({
        filename: 'test.css',
        minify: true,
        code: Buffer.from(code),
        visitor: inlineSvgFunction('test.css'),
    }).code.toString();
}

describe('Load SVG', () => {
    it('loads an SVG from a relative path', () => {
        const res = runVisitor(`
            .test {
                background: inline-svg("./test/fixtures/icon.svg") no-repeat;
            }
        `);

        expect(res).toBe(`.test{background:url("${encodedTestSvg}")no-repeat}`);
    });

    it('can receive SVG code as a string', () => {
        const res = runVisitor(`
            .test {
                background: inline-svg('<svg xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="8"/></svg>') no-repeat;
            }
        `);

        expect(res).toBe(`.test{background:url("${encodedTestSvg}")no-repeat}`);
    });

    it('warns about file not found', () => {
        const code = `
            .test {
                background: inline-svg("./test/fixtures/does-not-exist.svg");
            }
        `;

        expect(() => runVisitor(code))
            .toThrowError(/^Sonata CSS: path passed to inline-svg function not found/);
    });

    it('warns about non svg files', () => {
        const code = (`
            .test {
                background: inline-svg("./test/fixtures/file.txt");
            }
        `);

        expect(() => runVisitor(code))
            .toThrowError(/^Sonata CSS: path provided to inline-svg function is not a svg file:/);
    });

    it('adds missing data URI', () => {
        const svg = '<svg><circle cx="12" cy="12" r="8"/></svg>';
        const res = runVisitor(`
            .test {
                background: inline-svg('${svg}');
            }
        `);

        expect(res).toBe('.test{background:url("data:image/svg+xml;charset=utf-8,' + encodeForTest(svg) + '")}');
    });
});

describe('Attributes', () => {
    it('applies attributes', () => {
        const res = runVisitor(`
            .test {
                background: inline-svg("./test/fixtures/icon.svg", fill: currentColor, stroke: #001234);
            }
        `);

        const expected = '<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" stroke="#001234"><circle cx="12" cy="12" r="8"/></svg>';

        expect(res).toBe('.test{background:url("data:image/svg+xml;charset=utf-8,' + encodeForTest(expected) + '")}');
    });

    it('replaces attributes', () => {
        const res = runVisitor(`
            .test {
                background: inline-svg("./test/fixtures/icon-with-attributes.svg", stroke: none, aria-hidden: true);
            }
        `);

        const expected = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="none" fill="currentColor" aria-hidden="true"><circle cx="12" cy="12" r="8"/></svg>';

        expect(res).toBe('.test{background:url("data:image/svg+xml;charset=utf-8,' + encodeForTest(expected) + '")}');
    });

    it('replaces current color', () => {
        const res = runVisitor(`
            .test {
                background: inline-svg("./src/icons/success.svg", color: #502a7a);
            }
        `);

        const expected = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#502a7a" stroke-width="2"><path d="m7.2 12.3 2.9 2.9 6.6-6.6"/><circle cx="12" cy="12" r="9"/></svg>';

        expect(res).toBe('.test{background:url("data:image/svg+xml;charset=utf-8,' + encodeForTest(expected) + '")}');
    });
});
