import {keywords, title} from "@clover/public/utils/seo";
import LinkErrorPage from "@/components/pages/link/error";
import { t } from '@clover/public/locale';
import {Metadata} from "next";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: title(t("快捷登录 - 错误")),
        keywords: keywords(),
    }
}

const Page = () => <LinkErrorPage />

export default Page;
