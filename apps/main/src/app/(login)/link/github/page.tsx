import {keywords, title} from "@clover/public/utils/seo";
import LinkPage from "@/components/pages/link";
import { t } from '@clover/public/locale';
import {Metadata} from "next";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: title(t("快捷登录 - Github")),
        keywords: keywords(),
    }
}


const Page = () => <LinkPage type={"github"} />

export default Page;
