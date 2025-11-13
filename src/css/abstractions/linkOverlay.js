import { symbols } from 'unocss';

export const linkOverlay = [
    ['link-overlay', {
        [symbols.selector]: selector => `${selector}::after`,
        'content': '""',
        'inset': 0,
        'position': 'absolute',
        'z-index': 1,
    }],
];
