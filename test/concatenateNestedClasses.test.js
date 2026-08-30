import concatenateNestedClasses from '../src/visitors/concatenateNestedClasses.js';
import { Features, transform } from "lightningcss";
import { expect, it } from "vitest";

function runVisitor(code) {
    return transform({
        filename: 'test.css',
        minify: true,
        code: Buffer.from(code),
        visitor: concatenateNestedClasses(),
        include: Features.MediaRangeSyntax,
    }).code.toString();
}

it('concatenates classes', () => {
    const res = runVisitor(`
        .component {
            color: #111;
            &--modifier { color: #222 }
        }
    `);

    expect(res).toMatchCss(`
        .component {
            color: #111;
            &:where(.component--modifier) { color: #222 }
        }
    `);
});

it('concatenates classes in selectors with attributes', () => {
    const res = runVisitor(`
        .component[data-foo] {
            color: #111;
            &--modifier { color: #222 }
        }
    `);

    expect(res).toMatchCss(`
        .component[data-foo] {
            color: #111;
            &:where(.component--modifier) { color: #222 }
        }
    `);
});

it('concatenates only the last class in a selector of multiple classes', () => {
    const res = runVisitor(`
        .foo .bar {
            &-suffix { color: #000 }
        }
    `);

    expect(res).toMatchCss(`
        .foo .bar {
            &:where(.bar-suffix) { color: #000 }
        }
    `);
});

it('concatenates only the class in a selector', () => {
    const res = runVisitor(`
        .foo, p {
            &-suffix { 
                color: #222;
            }
        }
    `);

    expect(res).toMatchCss(`
        .foo, p {
            &:where(.foo-suffix) {
                color: #222;
            }
        }
    `);
});

it ('concatenates multiple parent classes', () => {
    const res = runVisitor(`
        .foo, .bar {
            &--modifier { 
                color: #222;
            }
        }
    `);

    expect(res).toMatchCss(`
        .foo, .bar {
            &:where(.foo--modifier, .bar--modifier) { 
                color: #222;
            }
        }
    `);
});

it ('can concatenate the same class multiple times', () => {
    const res = runVisitor(`
        .foo {
            &-one { color: #111 }
            &-two { color: #222 }
        }
    `);

    expect(res).toMatchCss(`
        .foo {
            &:where(.foo-one) { color: #111 }
            &:where(.foo-two) { color: #222 }
        }
    `);
});

it('concatenates classes inside a pseudo-class', () => {
    const res = runVisitor(`
        .foo {
            :not(&--modifier) {
                color: red
            }
        }
    `);

    expect(res).toMatchCss(`
        .foo {
            :not(&:where(.foo--modifier)) { 
                color: red 
            }
        }
    `);
});

it('does not concatenate elements or pseudo-classes', () => {
    const res = runVisitor(`
        p, :hover {
            &-suffix {
                color: #222;
            }
        }
    `);

    expect(res).toMatchCss(`
        p, :hover {
            &-suffix { 
                color: #222;
            }
        }
    `);
});

it('concatenates deeply nested classes', () => {
    const res = runVisitor(`
        .first-level {
            color: #111;

            &-foo { color: #aaa; }
            
            & .second-level {
                color: #222;
                
                @media (min-width: 1000px) {
                    &-bar { color: #bbb }
                }
            }
        }
    `);

    expect(res).toMatchCss(`
        .first-level {
            color: #111;
            
            &:where(.first-level-foo) { color: #aaa; }
            
            & .second-level {
                color: #222;
                
                @media (min-width: 1000px) {
                    &:where(.second-level-bar) { color: #bbb }
                }
            }
        }
    `);
});

it('concatenates classes inside @layer rules', () => {
    const res = runVisitor(`
        @layer components {
            .component {
                color: #111;
                &--modifier { color: #222 }
            }
        }
    `);

    expect(res).toMatchCss(`
        @layer components {
            .component {
                color: #111;
                &:where(.component--modifier) { color: #222 }
            }
        }
    `);
});

it('concatenates classes inside a nested media query', () => {
    const res = runVisitor(`
        .component {
            color: #111;
            
            @media (min-width: 800px) {
                &--modifier { color: #222 }
            }
        }
    `);

    expect(res).toMatchCss(`
        .component {
            color: #111;
            
            @media (min-width: 800px) {
                &:where(.component--modifier) { color: #222 }
            }
        }
    `);
});
