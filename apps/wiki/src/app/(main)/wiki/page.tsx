import {keywords, title} from "@clover/public/utils/seo";
import {IndexPage} from "@/components/pages/home";
import {Metadata} from "next";
import { t } from '@clover/public/locale';

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: title(t("首页")),
        keywords: keywords(),
    }
}

const Page = () => <IndexPage />

export default Page;
