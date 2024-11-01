import publicConfig from "@clover/public/config/next.js";

/** @type {import('next').NextConfig} */
export default {
    ...publicConfig,
    assetPrefix: "/assets/i18n/static",
};
