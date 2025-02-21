import {NextConfig} from "next";

const isDev = process.env.NODE_ENV !== 'production';

export default {
  output: 'standalone',
  reactStrictMode: false,
  trailingSlash: false,
  transpilePackages: ['@clover/public'],
  devIndicators: {
    buildActivity: false
  },
  compiler: {
    removeConsole: !isDev,
  },
  typescript: {
    // ignoreBuildErrors: true,
  },
} as NextConfig;
