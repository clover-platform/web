import publicConfig from "@clover/public/config/next";
import withPageImports from "@easykit/page-imports";

const configWrapper = withPageImports({
  imports: [
    "@clover/public/plugin/rest.server",
    "@clover/public/plugin/locales",
    "@/plugin/rest.server",
    "@/plugin/locales",
    "@/assets/style/index.scss"
  ]
})

export default configWrapper({
  ...publicConfig,
  assetPrefix: "/assets/i18n/static"
});
