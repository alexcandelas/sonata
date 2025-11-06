export const transition = [
    ['transition-all', { 'transition-property': 'all' }],
    ['transition-none', { 'transition-property': 'none' }],
];

export const transitionTiming = [
    ['transition-linear', { 'transition-timing-function': 'linear' }],
    ['transition-ease', { 'transition-timing-function': 'ease' }],
    ['transition-in', { 'transition-timing-function': 'ease-in' }],
    ['transition-out', { 'transition-timing-function': 'ease-out' }],
    ['transition-in-out', { 'transition-timing-function': 'ease-in-out' }],
];

export const transitionDuration = [
    ['transition-0', { 'transition-duration': '0s' }],
    [/^transition-(\d+)(ms)?$/, ([_, duration]) => ({ 'transition-duration': `${duration}ms` })],
    [/^transition-(\d+(\.\d+)?)s$/, ([_, duration]) => ({ 'transition-duration': `${duration}s` })],
];

export const transitionDelay = [
    ['transition-delay-0', { 'transition-delay': '0s' }],
    [/^(-?)transition-delay-(\d+)(ms)?$/, ([_, negative = '', duration]) => ({ 'transition-delay': `${negative}${duration}ms` })],
    [/^(-?)transition-delay-(\d+(\.\d+)?)s$/, ([_, negative = '', duration]) => ({ 'transition-delay': `${negative}${duration}s`})],
];
