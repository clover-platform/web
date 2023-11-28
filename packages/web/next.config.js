import findWorkspaceRoot from 'find-yarn-workspace-root';
import { webpackConfig } from "@easy-kit/i18n/utils/config.js";
import withConfig from '@next/router-config';

const isDev = process.env.NODE_ENV !== 'production';
// 语言默认值
process.env.UI_LANG = process.env.UI_LANG || 'zh-cn';
// 接口代理
const apiConfig = {
    dev: 'http://localhost:3000', // 开发
};
const apiBase = apiConfig[process.env.API || 'dev'];

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    trailingSlash: true,
    output: isDev ? 'standalone' : "export",
    transpilePackages: ['@clover/common'],
    devIndicators: {
        buildActivity: false
    },
    compiler: {
        removeConsole: !isDev,
    },
    rewrites: isDev ? async () => {
        return { fallback: [{ source: '/api/:path*', destination: `${apiBase}/api/:path*`}] }
    } : null,
    webpack: (config, ctx) => {
        config.resolve = {
            ...config.resolve,
            modules: [...config.resolve.modules, findWorkspaceRoot()],
        }
        if (ctx.dev) {
            config.module.rules.push(webpackConfig);
        }
        return config;
    }
}

const config = withConfig();
export default config(nextConfig);
