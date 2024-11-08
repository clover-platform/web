import {keywords, title} from "@clover/public/utils/seo";
import {ActivityPage} from "@/components/pages/activity";
import { t } from '@easykit/common/utils/locale';

export const metadata = {
    title: title(t("动态")),
    keywords: keywords(),
}

const Page = () => <ActivityPage />

export default Page;
