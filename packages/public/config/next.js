const isDev = process.env.NODE_ENV !== 'production';

/** @type {import('next').NextConfig} */
export default {
    output: 'standalone',
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
    async rewrites() {
        return {
            fallback: [
                {
                    source: '/api/:path*',
                    destination: `${process.env.API_URL}/api/:path*`,
                },
            ],
        }
    },
}
