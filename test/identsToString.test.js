import { describe, expect, it } from "vitest";
import { identsToString } from '../src/utils/identsToString.js';
import { transform } from "lightningcss";

function parseSelector(code) {
    let parsedSelector;

    transform({
        filename: 'test.css',
        code: Buffer.from(code + '{color: green;}'),
        visitor: {
            Selector(selector) {
                parsedSelector = identsToString(selector);
            }
        }
    });

    return parsedSelector;
}

function parseAndCompare(selectors) {
    selectors = Array.isArray(selectors) ? selectors : [selectors];

    selectors.forEach(
        selector => expect(parseSelector(selector)).toBe(selector)
    );
}

it('parses class selectors', () => {
    parseAndCompare([
        '.class',
    ]);
});

it('supports elemental selectors', () => {
    parseAndCompare([
        'button',
        '*',
        ':defined',
        'foo|h1',
        '|h1',
        'foo|*',
    ]);

    expect(parseSelector('* + *')).toBe('*+*');
});

it('parses ID selectors', () => {
    parseAndCompare([
        '#id',
    ]);
});

it('parses selectors with special characters', () => {
    expect(parseSelector('.\\<md\\:mb-0')).toBe('.<md:mb-0');
    expect(parseSelector('#\\<md\\:mb-0')).toBe('#<md:mb-0');
    expect(parseSelector('.one\\?two')).toBe('.one?two');
    expect(parseSelector('#one\\?two')).toBe('#one?two');
});

it('parses selectors that starts with a number', () => {
    expect(parseSelector('.\\31 23')).toBe('.123');
    expect(parseSelector('#\\31 23')).toBe('#123');
});

it('parses complex selectors', () => {
    parseAndCompare([
        '.one.two.three',
        'div.one.two',
        'div#id.class',
        'body>h2:not(:first-of-type):not(:last-of-type)',
    ]);
});

describe('Combinators', () => {
    it('supports descendant combinators', () => {
        parseAndCompare([
            'p a',
            '.parent .child',
        ]);
    });

    it('supports child combinators', () => {
        expect(parseSelector('.parent > a')).toBe('.parent>a');
        expect(parseSelector('a > .child')).toBe('a>.child');
    });

    it('supports next-sibling combinators', () => {
        expect(parseSelector('li + li')).toBe('li+li');
        expect(parseSelector('.class + .class')).toBe('.class+.class');
    });

    it('supports subsequent-sibling combinators', () => {
        expect(parseSelector('.class ~ .class')).toBe('.class~.class');
    });
});

describe('Pseudo-elements', () => {
    it('supports typographic pseudo-elements', () => {
        parseAndCompare([
            '::first-line',
            '::first-letter',
            '::prefix',
            '::postfix',
        ]);
    });

    it('supports highlight pseudo-elements', () => {
        parseAndCompare([
            '::selection',
            '::target-next',
            '::spelling-error',
            '::grammar-error',
        ]);
    });

    it('supports tree-abiding pseudo-elements', () => {
        parseAndCompare([
            '::after',
            '::before',
            '::marker',
            '::placeholder',
            '::file-selector',
        ]);
    });
});

describe('Pseudo-classes', () => {
    it('supports logical pseudo-classes', () => {
        parseAndCompare([
            ':is(disabled)',
            ':is(h1):has(h2)',
            ':not(.class)',
            ':not(strong, .class)',
            ':not(a.disabled, :disabled)',
            'a:where(:not(:hover))',
            'section:has(:not(h1, h2, h3, h4, h5, h6))',
        ]);

        expect(parseSelector('dt:has(+ dt)')).toBe('dt:has(+dt)');
        expect(parseSelector(':has(> img)')).toBe(':has(>img)');
    });

    it('supports linguistic pseudo-classes', () => {
        parseAndCompare([
            ':dir(rtl)',
            ':lang(en-US)',
            ':lang(ES, FR)',
        ]);
    });

    it('supports location pseudo-classes', () => {
        parseAndCompare([
            ':any-link',
            ':link',
            ':visited',
            ':local-link',
            ':target',
            ':target-within',
            ':scope',
        ]);
    });

    it('supports user action pseudo-classes', () => {
        parseAndCompare([
            ':hover',
            ':active',
            ':focus',
            ':focus-visible',
            ':focus-within',
            ':hover:active:focus',
        ]);
    });

    it('supports time-dimensional pseudo-classes', () => {
        parseAndCompare([
            ':current',
            ':past',
            ':future',
        ]);
    });

    it('supports resource state pseudo-classes', () => {
        parseAndCompare([
            ':playing',
            ':paused',
            ':seeking',
            ':buffering',
            ':stalled',
        ]);
    });

    it('supports element display pseudo-classes', () => {
        parseAndCompare([
            ':open',
            ':closed',
            ':modal',
            ':fullscreen',
            ':picture-in-picture',
        ]);
    });

    it('supports structural pseudo-classes', () => {
        parseAndCompare([
            ':root',
            ':empty',
            ':first-child',
            ':last-child',
            ':only-child',
            ':first-child:last-child',
            ':nth-child(1):nth-last-child(1)',
            ':nth-child(2)',
            ':nth-child(2n-1)',
            ':nth-child(10n+3)',
            ':nth-child(-n+3)',
            ':nth-child(-3)',
            ':nth-child(-n+3 of li.important)',
            'foo:nth-last-child(-n+2)',
            ':nth-of-type(n+2):nth-last-of-type(n+2)',
            ':nth-last-of-type(3n-1)',
            ':first-of-type',
            ':last-of-type',
            ':only-of-type',
            ':nth-col(2n+1)',
            ':nth-last-col(2n-1)',
        ]);

        // Lightning CSS changes the value of `even` and `odd`
        expect(parseSelector(':nth-child(even)')).toBe(':nth-child(2n)')
        expect(parseSelector(':nth-child(odd)')).toBe(':nth-child(2n+1)')
    });

    it('supports input pseudo-classes', () => {
        parseAndCompare([
            ':enabled',
            ':disabled',
            ':read-only',
            ':read-write',
            ':placeholder-shown',
            ':autofill',
            ':default',
            ':checked',
            ':indeterminate',
            ':blank',
            ':valid',
            ':in-range',
            ':out-of-range',
            ':required',
            ':optional',
            ':user-valid',
            ':user-invalid',
        ]);
    });
});

describe('Attributes', () => {
    it('supports presence of attributes', () => {
        parseAndCompare([
            '[title]',
            'div[data-attribute]',
        ]);
    });

    it('supports equal value attributes', () => {
        parseAndCompare([
            '[title="foo"]',
            'a[href="https://example.org"]',
            'div[data-lang="zh-Hant-TW"]',
        ]);
    });

    it('supports include value attributes', () => {
        parseAndCompare([
            'a[class~="logo"]',
            'div[lang~="en-us"]',
        ]);
    });

    it('supports subcode match attributes', () => {
        parseAndCompare([
            '[lang|="en"]',
        ]);
    });

    it('supports prefix attributes', () => {
        parseAndCompare([
            '[href^="#"]',
        ]);
    });

    it('supports suffix attributes', () => {
        parseAndCompare([
            'a[href$=".org"]',
        ]);
    });

    it('supports substring attributes', () => {
        parseAndCompare([
            'a[href*="example"]',
        ]);
    });

    it('supports attributes with case sensitivity', () => {
        parseAndCompare([
            'a[href*="insensitive" i]',
            'a[href*="cAsE" s]',
        ]);
    });

    it('supports chaining attributes', () => {
        parseAndCompare([
            'a[href^="https://"][href$=".org"]',
        ]);
    });
});
