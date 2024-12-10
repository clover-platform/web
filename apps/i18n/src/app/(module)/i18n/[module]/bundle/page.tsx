import {keywords, title} from "@clover/public/utils/seo";
import {BundlePage} from "@/components/pages/bundle";
import { t } from '@clover/public/locale';
import {Metadata} from "next";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: title(t("下载")),
        keywords: keywords(),
    }
}

const Page = () => <BundlePage />

export default Page;
