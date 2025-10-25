import copyRule from '../src/visitors/copyRule.js';
import extractCopiedSelectors from '../src/utils/extractCopiedSelectors.js';
import { expect, it } from "vitest";
import { transform } from "lightningcss";

function runVisitor(code) {
    const customAtRules = {
        copy: { prelude: '*' },
    };

    const copiedSelectors = extractCopiedSelectors(code);

    return transform({
        filename: 'test.css',
        minify: true,
        code: Buffer.from(code),
        customAtRules,
        visitor: copyRule(code, 'test.css', customAtRules, copiedSelectors),
    }).code.toString();
}

it('copies rules from a class', () => {
    const res = runVisitor(`
        .source {
            color: green;
            margin: 0;
        }
    
        .target {
            @copy .source;
        }
    `);

    expect(res).toMatchCss(`
        .source { color:green; margin:0 } 
        .target { color:green; margin:0; }
    `);
});

it('does not replace an existing declaration', () => {
    const res = runVisitor(`
        .source {
            color: green;
        }
    
        .target {
            @copy .source;
            color: red;
        }
    `);

    expect(res).toMatchCss(`
        .source { color: green }
        .target { color: green; color: red; }
    `);
});

it('does not remove existing declarations', () => {
    const res = runVisitor(`
        .source { color: green }
    
        .target {
            @copy .source;
            &:before { content: "" }
            @screen lg { width: 100px; }
        }
    `);

    expect(res).toMatchCss(`
        .source { color: green }
        .target {
            color: green;
            &:before { content: ""; }
            @screen lg { width: 100px; }
        }
    `);
});

it('can copy from a different layer', () => {
    const res = runVisitor(`
        @layer one {
            .source { color: green }
        }
    
        @layer two {
            .target {
                @copy .source;
            }
        }
    `);

    expect(res).toMatchCss(`
        @layer one {
            .source { color: green }
        }
    
        @layer two {
            .target { color: green }
        }
    `);
});

it('can copy from inside a media query', () => {
    const res = runVisitor(`
        .source { color: green }
    
        @media (width > 50em) {
            .foo {
                @copy .source;
            }
        }
        
        .bar {
            @media (width > 50em) {
                @copy .source;
            }
        }
    `);

    expect(res).toMatchCss(`
        .source { color: green }
    
        @media (width > 50em) {
            .foo { color: green }
        }
        
        .bar {
            @media (width > 50em) {
                color: green
            }
        }
    `);
});

it('can copy from inside a container query', () => {
    const res = runVisitor(`
        .source { color: green }
    
        @container (width > 50em) {
            .foo {
                @copy .source;
            }
        }
        
        .bar {
            @container (width > 50em) {
                @copy .source;
            }
        }
    `);

    expect(res).toMatchCss(`
        .source { color: green }
    
        @container (width > 50em) {
            .foo { color: green }
        }

        .bar {
            @container (width > 50em) {
                color: green
            }
        }
    `);
});

it('respects existing declarations inside a @media query', () => {
    const res = runVisitor(`
        .source { color: green }
        
        .target {
            @media (width > 50em) {
                @copy .source;
                font-size: 14px;
            }
        }
    `);

    expect(res).toMatchCss(`
        .source { color: green }
    
        .target {
            @media (width > 50em) {
                color: green;
                font-size: 14px;
            }
        }
    `);
});

it('respects existing declarations inside a @container query', () => {
    const res = runVisitor(`
        .source { color: green }
        
        .target {
            @container (width > 50em) {
                @copy .source;
                font-size: 14px;
            }
        }
    `);

    expect(res).toMatchCss(`
        .source { color: green }
    
        .target {
            @container (width > 50em) {
                color: green;
                font-size: 14px;
            }
        }
    `);
});
