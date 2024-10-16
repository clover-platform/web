import {keywords, title} from "@clover/public/utils/seo";
import { t } from '@easykit/common/utils/locale'

export const metadata = {
    title: title(t("管理中心")),
    keywords: keywords(),
}

const Page = () => "admin";

export default Page;
