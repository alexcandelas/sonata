function resolveValue(prop, token, validTokens) {
    if (! validTokens.includes(token)) return;

    if (token === 'DEFAULT') {
        return `var(--${prop})`;
    }

    return `var(--${prop}-${token})`;
}

function buildDeclaration(prop, token = '', validTokens = []) {
    const unsetValue = '0 0';
    const resolvedValue = token === '' ? unsetValue : resolveValue(prop, token, validTokens);

    if (resolvedValue) {
        return {
            [`--sonata-${prop}`]: resolvedValue,
            'box-shadow': `var(--sonata-inset-box-shadow, ${unsetValue}), var(--sonata-box-shadow, ${unsetValue})`
        };
    }
}

export function boxShadow(tokens = {}) {
    const validTokens = Object.keys(tokens);

    return [
        ['shadow', buildDeclaration('box-shadow', 'DEFAULT', validTokens)],
        [/^shadow-([\w-]+)$/, ([_, token]) => buildDeclaration('box-shadow', token, validTokens)],
        ['shadow-none', buildDeclaration('box-shadow')],
    ];
}

export function insetBoxShadow(tokens = {}) {
    const validTokens = Object.keys(tokens);

    return [
        ['inset-shadow', buildDeclaration('inset-box-shadow', 'DEFAULT', validTokens)],
        [/^inset-shadow-([\w-]+)$/, ([_, token]) => buildDeclaration('inset-box-shadow', token, validTokens)],
        ['inset-shadow-none', buildDeclaration('inset-box-shadow')],
    ];
}
