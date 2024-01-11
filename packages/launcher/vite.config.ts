import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { readFileSync } from 'fs'

function resolve(str: string) {
    return path.resolve(__dirname, str)
}

const packageJson = JSON.parse(
    readFileSync('./package.json', { encoding: 'utf-8' }),
)
const globals = {
    ...(packageJson?.dependencies || {}),
}

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        // 输出文件夹
        outDir: 'dist',
        lib: {
            // 组件库源码的入口文件
            entry: resolve('src/index.tsx'),
            // 组件库名称
            name: 'CloverLauncher',
            // 文件名称, 打包结果举例: suemor.cjs
            fileName: 'clover-launcher',
            // 打包格式
            formats: ['es', 'cjs'],
        },
        rollupOptions: {
            //排除不相关的依赖
            external: ['react', 'react-dom', ...Object.keys(globals)],
        },
    },
})
