// 语言默认值
import { webpackConfig } from "@easy-kit/i18n/utils/config.js";

process.env.UI_LANG = process.env.UI_LANG || 'zh-cn';
const isDev = process.env.NODE_ENV !== 'production';

export const apiRewrites = (apiConfig) => {
    const apiBase = apiConfig[process.env.API || 'dev'];
    return isDev ? async () => {
        return {
            fallback: [{
                source: `/api/:path*`,
                destination: `${apiBase}/api/:path*`
            }]
        }
    } : undefined;
}

/** @type {import('next').NextConfig} */
export default {
    reactStrictMode: false,
    trailingSlash: true,
    // output: isDev ? 'standalone' : "export",
    transpilePackages: ['@easy-kit/common'],
    devIndicators: {
        buildActivity: false
    },
    compiler: {
        removeConsole: !isDev,
    },
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
    },
    webpack: (config, ctx) => {
        config.resolve = {
            ...config.resolve,
            modules: [...config.resolve.modules],
        }
        if (ctx.dev) {
            config.module.rules.push(webpackConfig);
        }
        return config;
    }
}
