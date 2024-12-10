import {keywords, title} from "@clover/public/utils/seo";
import {AddBundlePage} from "@/components/pages/bundle/add";
import { t } from '@clover/public/locale';
import {Metadata} from "next";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: title(t("添加文件")),
        keywords: keywords(),
    }
}

const Page = () => <AddBundlePage />

export default Page;
