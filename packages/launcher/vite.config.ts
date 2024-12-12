import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";
import dts from 'vite-plugin-dts'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import pkg from "./package.json";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        dts({
            include: [
                "./lib/**/*",
                "types.d.ts",
                "global.d.ts"
            ]
        }),
        react(),
        viteStaticCopy({
            targets: [
                { src: './package.json', dest: './' },
                { src: './lib/locales/en-US.json', dest: './locales' },
                { src: './lib/locales/zh-CN.json', dest: './locales' },
                { src: './lib/locales/zh-TW.json', dest: './locales' },
                { src: './README.md', dest: './' }
            ],
        }),
    ],
    resolve: {
        alias: {
            "@clover-platform/launcher": path.resolve(__dirname, "./lib/"),
        }
    },
    build: {
        lib: {
            entry: {
                index: "./lib/index.ts"
            },
            formats: ["es"]
        },
        rollupOptions: {
            external: [
                "react",
                "react-dom",
                "react/jsx-runtime",
                "@easykit/design",
                "i18next",
                ...Object.keys(pkg.dependencies || {}),
            ],
            output: {
                entryFileNames: '[name].js',
                chunkFileNames: '[name].js',
                globals: {
                    "react": "React",
                    "react-dom": "ReactDOM",
                    "react/jsx-runtime": "react/jsx-runtime",
                },
            },
        },
    },
})
