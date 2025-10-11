import palette from '../../src/config/palette.js';
import { flattenObject } from '../utils/flattenObject.js';

function searchInResolvedConfig(_colorToken, resolvedTokens) {
    let colorToken = _colorToken;

    if (! colorToken.startsWith('color-')) {
        colorToken = `color-${colorToken}`;
    }

    return resolvedTokens[colorToken] ;
}

function searchInPalette(_colorToken) {
    let colorToken = _colorToken.replace(/^color-/, '');
    let flattenedPalette = flattenObject(palette);

    return flattenedPalette[colorToken];
}

/**
 * Retrieve the requested color from the resolved configuration if available;
 * otherwise, fall back to the palette configuration.
 *
 * @returns {string}
 */
export default function colorFallback(tokens) {
    return {
        Function: {
            'colorFallback'(fn) {
                let colorToken = fn.arguments[0]?.value.value;

                if (! colorToken) {
                    throw new Error(`Sonata CSS: the colorFallback function requires a color token to search for.`);
                }

                colorToken = colorToken.replace('.', '-');

                let foundValue = searchInResolvedConfig(colorToken, tokens) || searchInPalette(colorToken);

                if (foundValue) return { raw: foundValue };

                throw new Error(`Sonata CSS: color token "${colorToken}" is not registered.`);
            }
        }
    };
}
