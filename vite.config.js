import { defineConfig } from 'vite';
import vue2 from '@vitejs/plugin-vue2';
import path from 'path';

export default defineConfig({
    plugins: [vue2()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    /*     server: {
            proxy: {
                '/api': {
                    target: 'https://test3.pulsprodaj.ru',
                    changeOrigin: true,
                    secure: false,
                },
            },
        }, */
    build: {
        outDir: 'docs'
    },
    base: './'
});
