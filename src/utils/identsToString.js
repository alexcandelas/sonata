function handleAttributes(value) {
    const operators = {
        'equal': '=',
        'includes': '~=',
        'dash-match': '|=',
        'prefix': '^=',
        'suffix': '$=',
        'substring': '*=',
    };

    const caseSensitivity = {
        'case-sensitive': '',
        'ascii-case-insensitive': ' i',
        'explicit-case-sensitive': ' s',
        'ascii-case-insensitive-if-in-html-element-in-html-document': '',
    };

    if (! value.operation) {
        return `[${value.name}]`;
    }

    let result =
        value.name
        + operators[value.operation?.operator]
        + '"' + value.operation.value + '"'
        + caseSensitivity[value.operation.caseSensitivity];

    return `[${result}]`;
}

function handlePseudoClass(value) {
    switch (value.kind) {
        case 'custom':
            return ':' + value.name;
        case 'dir':
            return ':' + value.kind + '(' + value.direction + ')';
        case 'lang':
            return ':' + value.kind + '(' + value.languages.join(', ') + ')';
    }

    if (value.selectors) {
        let selectors = value.selectors
            .map(selector => identsToString(selector)).join(', ')
            .replace(/^:scope\s?/, '');

        return ':' + value.kind + '(' + selectors + ')';
    }

    return ':' + value.kind;
}

function handleIndexedPseudoClass(value) {
    let a, b, of;

    if (value.a) {
        a = value.a > 1 || value.a < -1 ? value.a + 'n' : value.a.toString().replace('1', 'n');
    } else {
        a = '';
    }

    if (value.b) {
        b = a && value.b > 0 ? ('+' + value.b) : value.b;
    } else {
        b = '';
    }

    if (value.of) {
        of = ' of ' + value.of.map(ident => identsToString(ident)).join('');
    } else {
        of = '';
    }

    return ':' + value.kind + '(' + a + b + of + ')';
}

function handleCombinator(value) {
    const combinators = {
        'child': '>',
        'descendant': ' ',
        'next-sibling': '+',
        'later-sibling': '~',
    };

    return combinators[value];
}

function handleColor(value) {
    const hex = '#'
        + value.r.toString(16).padStart(2, '0')
        + value.g.toString(16).padStart(2, '0')
        + value.b.toString(16).padStart(2, '0');

    if (value.alpha === 1 || value.alpha === undefined) {
        return hex;
    }

    return hex + (Math.round(255 * value.alpha)).toString(16);
}

/**
 * Transform an array of custom CSS identifiers to a string.
 *
 * @param {Array} idents
 * @param {boolean} insideFunction
 * @returns {string}
 */
export default function identsToString(idents, insideFunction = false) {
    const characters = {
        comma: insideFunction ? ',' : ', ',
        colon: ':',
        semicolon: ';',
        'white-space': ' ',
        'square-bracket-block': '[',
        'close-square-bracket': ']',
        universal: '*',
    };

    return idents.map(ident => {
        const value = ident.type === 'token' ? ident.value : ident;

        if (ident.type === 'function') {
            return ident.value.name + '(' + identsToString(ident.value.arguments, true) + ')';
        }

        switch (value.type) {
            case 'at-keyword':
                return '@' + value.value;
            case 'class':
                return '.' + value.name;
            case 'id':
                return '#' + value.name;
            case 'type':
                return value.name;
            case 'attribute':
                return handleAttributes(value);
            case 'color':
                return handleColor(value.value);
            case 'combinator':
                return handleCombinator(value.value);
            case 'namespace':
                return value.kind === 'none' ? '|' : value.prefix + '|';
            case 'pseudo-class':
                const indexed = ['nth-child', 'nth-last-child', 'nth-of-type', 'nth-last-of-type', 'nth-col', 'nth-last-col'];

                return indexed.includes(value.kind) ? handleIndexedPseudoClass(value) : handlePseudoClass(value);
            case 'pseudo-element':
                return value.kind === 'custom' ? '::' + value.name : '::' + value.kind;
            default:
                return characters[value.type] ?? value.value ?? '';
        }
    })
    .join('')
    .replace(/\s+/g, ' '); // Remove multiple spaces
}
