import {keywords, title} from "@clover/public/utils/seo";
import {ModuleSettingAIPage} from "@/components/pages/setting/ai";

export const metadata = {
    title: title("{#设置#}"),
    keywords: keywords(),
}

const Page = () => <ModuleSettingAIPage />

export default Page;
