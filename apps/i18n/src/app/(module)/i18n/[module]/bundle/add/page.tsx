import {keywords, title} from "@clover/public/utils/seo";
import {AddBundlePage} from "@/components/pages/bundle/add";
import { t } from '@easykit/common/utils/locale';

export const metadata = {
    title: title(t("添加文件")),
    keywords: keywords(),
}

const Page = () => <AddBundlePage />

export default Page;
