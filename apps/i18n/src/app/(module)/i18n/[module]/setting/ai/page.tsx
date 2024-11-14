import {keywords, title} from "@clover/public/utils/seo";
import {ModuleSettingAIPage} from "@/components/pages/setting/ai";
import { t } from '@easykit/common/utils/locale';
import {Metadata} from "next";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: title(t("设置")),
        keywords: keywords(),
    }
}

const Page = () => <ModuleSettingAIPage />

export default Page;
