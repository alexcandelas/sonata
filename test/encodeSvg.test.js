import encodeSvg from '../src/utils/encodeSvg.js';
import { expect, it } from "vitest";

it('encodes SVG code for inline use', () => {
    const original = `<svg xmlns="http://www.w3.org/2000/svg" viewBox='0 0 24 24' width="100%" stroke="#000"><circle cx="12" cy="12" r="8"/></svg>`;
    const expected = `%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%25" stroke="%23000"%3E%3Ccircle cx="12" cy="12" r="8"/%3E%3C/svg%3E`;

    expect(encodeSvg(original)).toBe(expected);
});
