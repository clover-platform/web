import withConfig from '@next/router-config';
import publicConfig, { apiRewrites } from "@clover/public/config/next.js";

const config = withConfig();
/** @type {import('next').NextConfig} */
export default config({
    ...publicConfig,
    rewrites: apiRewrites( {
        dev: { // 开发
            'main': 'http://localhost:3000',
            'i18n': 'http://localhost:3002',
        },
    }),
});
