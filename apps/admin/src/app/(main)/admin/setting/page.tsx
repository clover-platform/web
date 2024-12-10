import {keywords, title} from "@clover/public/utils/seo";
import { t } from '@clover/public/locale'
import {Metadata} from "next";
import {SettingPage} from "@/components/pages/setting";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: title(t("设置")),
        keywords: keywords(),
    }
}

const Page = () => <SettingPage />;

export default Page;
