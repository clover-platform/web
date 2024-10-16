const isDev = process.env.NODE_ENV !== 'production';

/** @type {import('next').NextConfig} */
export default {
    reactStrictMode: false,
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
