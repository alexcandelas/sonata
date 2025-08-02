import { defineConfig } from 'vite';

export default defineConfig({
    test: {
        setupFiles: [
            './test/vitestSetup.js',
        ]
    }
});
