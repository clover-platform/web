import {keywords, title} from "@clover/public/utils/seo";
import { t } from '@clover/public/locale';
import {Metadata} from "next";
import {HomePage} from "@/components/pages/home";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: title(t("价格")),
        keywords: keywords(),
    }
}

const Page = () => <div></div>

export default Page;
