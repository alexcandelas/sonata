/**
 * Look for the given key in the registered breakpoints and return its value.
 * If the value is not a registered breakpoint, return it with pixel units.
 *
 * @param {string} value
 * @param {Object} registeredBreakpoints
 * @returns {string}
 */
export function breakpointOrNumeric(value, registeredBreakpoints) {
    const isBreakpoint = Object.keys(registeredBreakpoints).includes(value);
    const result = isBreakpoint ? registeredBreakpoints[value] : value;

    return result.toString() + 'px';
}
