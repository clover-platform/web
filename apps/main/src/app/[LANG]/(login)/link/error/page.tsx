import {keywords, title} from "@clover/public/utils/seo";
import LinkErrorPage from "@/components/pages/link/error";

export const metadata = {
    title: title(t("快捷登录 - 错误")),
    keywords: keywords(),
}

const Page = () => <LinkErrorPage />

export default Page;
