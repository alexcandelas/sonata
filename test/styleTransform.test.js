import { expect, it } from 'vitest';
import { runVisitors } from './utils/runVisitors.js';

const config = {
    tokens: {
        colors: {
            primary: '#502a7a',
        },
    },
};

const originalCode = 'p { color: token(color-primary) }';
const expected = 'p { color: #502a7a }';

it('runs visitors in Vue scoped style CSS requests', async () => {
    const res = await runVisitors(originalCode, config, '/js/Component.vue?vue&type=style&index=0&scoped=foo&lang.css');

    expect(res).toMatchCss(expected);
});

it('runs visitors in component style CSS requests', async () => {
    const res = await runVisitors(originalCode, config, `/src/Component.example?example&type=style&index=0&lang.css`);

    expect(res).toMatchCss(expected);
});

it('does not run visitors in component non-CSS style requests', async () => {
    const res = await runVisitors(originalCode, config, `/src/Component.vue?vue&type=style&index=0&lang.scss`);

    expect(res).toBe(originalCode);
});

it('does not run visitors in component non-style requests', async () => {
    const res = await runVisitors(originalCode, config, `/src/Component.vue?vue&type=script&index=0&lang.css`);

    expect(res).toBe(originalCode);
});
