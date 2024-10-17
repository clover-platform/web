import path from "node:path";

const isDev = process.env.NODE_ENV !== 'production';

/** @type {import('next').NextConfig} */
export default {
    output: 'standalone',
    experimental: {
        // this includes files from the monorepo base two directories up
        outputFileTracingRoot: path.resolve('../../'),
    },
    reactStrictMode: false,
    trailingSlash: true,
    transpilePackages: ['@easykit/common'],
    devIndicators: {
        buildActivity: false
    },
    compiler: {
        removeConsole: !isDev,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
}
