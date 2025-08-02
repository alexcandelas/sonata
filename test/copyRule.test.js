import copyRule from '../src/visitors/copyRule.js';
import { expect, it } from "vitest";
import { transform } from "lightningcss";

function runVisitor(code) {
    const customAtRules = {
        copy: { prelude: '*' },
    };

    return transform({
        filename: 'test.css',
        minify: true,
        code: Buffer.from(code),
        customAtRules,
        visitor: copyRule(code, 'test.css', customAtRules),
    }).code.toString();
}

it('can copy rules from a class', () => {
    const res = runVisitor(`
        .source {
            color: green;
            margin: 0;
        }
    
        .copy {
            @copy .source;
        }
    `);

    expect(res).toMatchCss(`
        .source { color:green; margin:0 } 
        .copy { color:green; margin:0; }
    `);
});

it('does not replace an existing declaration', () => {
    const res = runVisitor(`
        .source {
            color: green;
        }
    
        .copy {
            @copy .source;
            color: red;
        }
    `);

    expect(res).toMatchCss(`
        .source { color: green }
        .copy { color: green; color: red; }
    `);
});

it('does not remove other declarations', () => {
    const res = runVisitor(`
        .source { color: green }
    
        .copy {
            @copy .source;
            &:before { content: "" }
            @screen lg { width: 100px; }
        }
    `);

    expect(res).toMatchCss(`
        .source { color: green }
        .copy {
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
            .copy {
                @copy .source;
            }
        }
    `);

    expect(res).toMatchCss(`
        @layer one {
            .source { color: green }
        }
    
        @layer two {
            .copy { color: green }
        }
    `);
});
