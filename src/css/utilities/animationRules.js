export const animationDelay = [
    ['animation-delay-0', { 'animation-delay': '0s' }],
    [/^(-?)animation-delay-(\d+)(ms)?$/, ([_, negative = '', duration]) => ({ 'animation-delay': `${negative}${duration}ms` })],
    [/^(-?)animation-delay-(\d+(\.\d+)?)s$/, ([_, negative = '', duration]) => ({ 'animation-delay': `${negative}${duration}s`})],
];

export const animationDirection = [
    ['animation-normal', { 'animation-direction': 'normal' }],
    ['animation-reverse', { 'animation-direction': 'reverse' }],
    ['animation-alternate', { 'animation-direction': 'alternate' }],
    ['animation-alternate-reverse', { 'animation-direction': 'alternate-reverse' }],
];

export const animationDuration = [
    ['animation-0', { 'animation-duration': '0s' }],
    [/^animation-(\d+)(ms)?$/, ([_, duration]) => ({ 'animation-duration': `${duration}ms` })],
    [/^animation-(\d+(\.\d+)?)s$/, ([_, duration]) => ({ 'animation-duration': `${duration}s` })],
];

export const animationFillMode = [
    ['animation-none', { 'animation-fill-mode': 'none' }],
    ['animation-forwards', { 'animation-fill-mode': 'forwards' }],
    ['animation-backwards', { 'animation-fill-mode': 'backwards' }],
    ['animation-both', { 'animation-fill-mode': 'both' }],
];

export const animationIterationCount = [
    ['animation-infinite', { 'animation-iteration-count': 'infinite' }],
];

export const animationPlayState = [
    ['animation-paused', { 'animation-play-state': 'paused' }],
    ['animation-running', { 'animation-play-state': 'running' }],
];

export const animationTiming = [
    ['animation-linear', { 'animation-timing-function': 'linear' }],
    ['animation-ease', { 'animation-timing-function': 'ease' }],
    ['animation-in', { 'animation-timing-function': 'ease-in' }],
    ['animation-out', { 'animation-timing-function': 'ease-out' }],
    ['animation-in-out', { 'animation-timing-function': 'ease-in-out' }],
];
