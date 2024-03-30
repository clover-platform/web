import {keywords, title} from "@clover/public/utils/seo";
import {ModuleSettingLanguagesPage} from "@/components/pages/module/setting/languages";

export const metadata = {
    title: title("{#设置#}"),
    keywords: keywords(),
}

const Page = () => <ModuleSettingLanguagesPage />

export default Page;
