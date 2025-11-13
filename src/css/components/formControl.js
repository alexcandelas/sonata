import { symbols } from 'unocss';

/**
 * Wrapper for form fields and all their related elements (e.g., label,
 * help text or validation feedback).
*/
export const formControl = [
    ['form-control', [
        {
            'margin-bottom': '1.5rem',
            'position': 'relative',
        },
        {
            [symbols.selector]: selector => `${selector}:last-child`,
            'margin-bottom': 0,
        },
    ]],
];
