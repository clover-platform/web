import {keywords, title} from "@clover/public/utils/seo";
import { Metadata } from "next";
import {t} from "@easykit/common/utils/locale";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: title(t("首页")),
        keywords: keywords(),
    }
}

const Page = () => <></>

export default Page;
