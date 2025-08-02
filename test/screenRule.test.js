import screenRule from '../src/visitors/screenRule.js';
import { expect, it } from "vitest";
import { transform } from "lightningcss";

function runVisitor(code) {
    const breakpoints = {
        'sm': 640,
        'lg': 1024
    };

    const customAtRules = {
        screen: {
            prelude: '*',
            body: 'style-block'
        },
    };

    return transform({
        filename: 'test.css',
        minify: true,
        code: Buffer.from(code),
        customAtRules,
        visitor: screenRule(breakpoints),
    }).code.toString();
}

it.each([
    ['@screen lg { .foo { color: red; }}', '@media (width >= 1024px) { .foo { color: red }}'],
    ['@screen <lg { .foo { color: red; }}', '@media (width <= 1023.9px) { .foo { color: red }}'],
    ['@screen sm to lg { .foo { color: red; }}', '@media (width >= 640px) and (width <= 1023.9px) { .foo { color: red }}'],
])('generates media queries for registered breakpoints', (source, expected) =>
    expect(runVisitor(source)).toMatchCss(expected)
);

it.each([
    ['@screen 100px { .foo { color: red; }}', '@media (width >= 100px) { .foo { color: red }}'],
    ['@screen 30rem { .foo { color: red; }}', '@media (width >= 30rem) { .foo { color: red }}'],
    ['@screen 1234 { .foo { color: red; }}', '@media (width >= 1234px) { .foo { color: red }}'],
    ['@screen <1234 { .foo { color: red; }}', '@media (width <= 1233.9px) { .foo { color: red }}'],
    ['@screen 1000px to 2000px { .foo { color: red; }}', '@media (width >= 1000px) and (width <= 1999.9px) { .foo { color: red }}'],
    ['@screen 1000 to 2000 { .foo { color: red; }}', '@media (width >= 1000px) and (width <= 1999.9px) { .foo { color: red }}'],
    ['@screen 500px to 50rem { .foo { color: red; }}', '@media (width >= 500px) and (width <=  49.99rem) { .foo { color: red }}'],
])('generates media queries for specific values', (source, expected) =>
    expect(runVisitor(source)).toMatchCss(expected)
);

it('generates nested media queries', () => {
    const source = `
        .foo {
            display: block;
            
            @screen lg {
                color: red;
            }
        }
    `;

    const expected = `
        .foo { 
            display: block; 
            @media (width >= 1024px) { color: red }
        }
    `;

    expect(runVisitor(source)).toMatchCss(expected);
});
