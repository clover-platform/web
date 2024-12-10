import {keywords, title} from "@clover/public/utils/seo";
import {ModuleSettingPage} from "@/components/pages/setting";
import { t } from '@clover/public/locale';
import {Metadata} from "next";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: title(t("设置")),
        keywords: keywords(),
    }
}

const Page = () => <ModuleSettingPage />

export default Page;
