import {keywords, title} from "@clover/public/utils/seo";
import { t } from '@clover/public/locale';
import {Metadata} from "next";
import {HomePage} from "@/components/pages/home";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: title(t("首页")),
        keywords: keywords(),
    }
}

const Page = () => <HomePage />

export default Page;
