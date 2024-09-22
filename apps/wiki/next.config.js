import publicConfig, { apiRewrites } from "@clover/public/config/next.js";

/** @type {import('next').NextConfig} */
export default {
    ...publicConfig,
    rewrites: apiRewrites( {
        dev: "http://localhost:3000",
    }),
}
