import sonatacss from '../../index.js';

export async function runVisitors(code, config = {}, id = 'test.css') {
    const plugins = (await sonatacss(config)).flat();

    for (const plugin of plugins) {
        if (! plugin.transform) continue;

        const result = await plugin.transform(code, id);

        if (result) {
            code = result?.code ?? result;
        }
    }

    return code;
}
