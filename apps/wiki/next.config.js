import publicConfig, { apiRewrites } from "@clover/public/config/next.js";

/** @type {import('next').NextConfig} */
export default {
    ...publicConfig,
    assetPrefix: "/assets/wiki",
    rewrites: apiRewrites( {
        dev: "http://localhost:3000",
    }),
}
