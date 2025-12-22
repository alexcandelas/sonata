import { symbols } from 'unocss';

export const link = [
    ['link', [
        {
            [symbols.body]: `
                @copy .btn-reset, a:where([href]);
                cursor: pointer;
            `,
        },
        {
            [symbols.selector]: selector => `${selector}:focus`,
            [symbols.body]: '@copy a:where([href]):focus;',
        },
        {
            [symbols.selector]: selector => `${selector}:hover`,
            [symbols.parent]: '@media (hover: hover)',
            [symbols.body]: '@copy a:where([href]):focus;',
        },
    ]],
    ['link-hover-underline', [
        { 'text-decoration': 'none' },
        {
            [symbols.selector]: selector => `${selector}:hover`,
            [symbols.parent]: '@media (hover: hover)',
            'text-decoration': 'underline',
        }
    ]],
];
