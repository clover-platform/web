import {keywords, title} from "@clover/public/utils/seo";
import {ModuleSettingPage} from "@/components/pages/setting";
import { t } from '@easykit/common/utils/locale';

export const metadata = {
    title: title(t("设置")),
    keywords: keywords(),
}

const Page = () => <ModuleSettingPage />

export default Page;
