import fs from 'fs';
import { dirname, resolve } from 'path';
import { encodeSvg } from '../utils/encodeSvg.js';
import { identsToString } from '../utils/identsToString.js';

/**
 * Return the svg content from the given path.
 *
 * @param {string} path
 * @param {string} srcId
 * @returns {string}
 */
function getContentFromFile(path, srcId) {
    let resolvedPath;

    if (path.startsWith('sonatacss/icons')) {
        resolvedPath = resolve('node_modules', path.replace('sonatacss/icons', 'sonatacss/src/icons'));
    } else {
        resolvedPath = resolve(dirname(srcId), path);
    }

    if (! fs.existsSync(resolvedPath)) {
        throw new Error(`Sonata CSS: path passed to inline-svg function not found: ${path}. Could not read ${resolvedPath}.`);
    }

    let content = fs.readFileSync(resolvedPath, 'utf8');

    if (! content.startsWith('<svg ')) {
        throw new Error(`Sonata CSS: path provided to inline-svg function is not a svg file: ${path}.`);
    }

    return `data:image/svg+xml;charset=utf-8,${content}`;
}

/**
 * Build a map of valid attributes and their values from the list of parameters.
 *
 * @param {Array} params
 * @returns {Array}
 */
function normalizeParams(params) {
    let map = identsToString(params);

    if (! map) return [];

    return map
        .replace(/(^,)|(,$)/g, '') // Remove leading and trailing commas
        .split(',')
        .map(el => {
            const split = el.split(':');

            return {
                name: split[0].trim(),
                value: split[1].trim(),
            }
        });
}

/**
 * Add or replace the provided attributes in the svg code.
 *
 * @param {string} svgContent
 * @param {Array} params
 * @returns {string}
 */
function replaceAttributes(svgContent, params) {
    const root = svgContent.match(/<svg\s*[^>]*>/)[0];

    normalizeParams(params).forEach(attr => {
        // The `color` special attribute replaces all occurrences of `currentColor` with the given value
        if (attr.name === 'color') {
            svgContent = svgContent.replaceAll('currentColor', attr.value);
            return;
        }

        const declaration = `${attr.name}="${attr.value}"`;

        if (root.indexOf(` ${attr.name}=`) === -1) {
            svgContent = svgContent.replace(/(<svg[^>]*)/, '$1 ' + declaration);
        } else {
            const regex = new RegExp(attr.name + '=["\'][#\\w]+["\']');
            svgContent = svgContent.replace(regex, declaration);
        }
    });

    return svgContent;
}

/**
 * Load a svg from a path and use it inside a `background` declaration.
 *
 * @param {string} srcId
 * @returns {Object}
 */
export default function inlineSvg(srcId) {
    return {
        Function: {
            'inline-svg'(fn) {
                let param = fn.arguments[0]?.value?.value;
                let content;

                if (! param) {
                    throw new Error(`Sonata CSS: inline-svg function requires a path or svg content as argument.`);
                }

                if (param.startsWith('data:image/svg')) {
                    content = param;
                } else if (param.startsWith('<svg')) {
                    content = 'data:image/svg+xml;charset=utf-8,' + param;
                } else {
                    content = getContentFromFile(param, srcId);
                }

                content = replaceAttributes(content.trim(), fn.arguments.slice(1));

                return { raw: `url('${encodeSvg(content)}')` };
            }
        }
    };
}
