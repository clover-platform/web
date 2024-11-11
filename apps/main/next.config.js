import publicConfig from "@clover/public/config/next.js";
import withPageImports from "@easykit/page-imports";

const configWrapper = withPageImports({
    imports: [
        "@clover/public/plugin/rest.server",
        "@/plugin/locales",
        "@clover/public/plugin/locales",
        "@/assets/style/index.scss"
    ]
})

/** @type {import('next').NextConfig} */
export default configWrapper({
    ...publicConfig,
    assetPrefix: "/assets/main/static",
})
