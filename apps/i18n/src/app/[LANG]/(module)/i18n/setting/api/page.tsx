import {keywords, title} from "@clover/public/utils/seo";
import {ModuleSettingAPIPage} from "@/components/pages/setting/api";
import { t } from '@easykit/common/utils/locale';

export const metadata = {
    title: title(t("设置")),
    keywords: keywords(),
}

const Page = () => <ModuleSettingAPIPage />

export default Page;
