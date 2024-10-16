import {keywords, title} from "@clover/public/utils/seo";
import {BundlePage} from "@/components/pages/bundle";
import { t } from '@easykit/common/utils/locale';

export const metadata = {
    title: title(t("下载")),
    keywords: keywords(),
}

const Page = () => <BundlePage />

export default Page;
