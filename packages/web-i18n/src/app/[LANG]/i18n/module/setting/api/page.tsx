import {keywords, title} from "@clover/public/utils/seo";
import {ModuleSettingAPIPage} from "@/components/pages/module/setting/api";

export const metadata = {
    title: title("{#设置#}"),
    keywords: keywords(),
}

const Page = () => <ModuleSettingAPIPage />

export default Page;
