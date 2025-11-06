import generateUtilities from './generateUtilities.js';
import { expect } from "vitest";

/**
 * @param {string} source
 * @param {string} expected
 * @param {Object?} config
 */
export default async function (source, expected, config = {}) {
    const res = await generateUtilities(source, config);

    expect(res).toMatchCss(expected);
}
