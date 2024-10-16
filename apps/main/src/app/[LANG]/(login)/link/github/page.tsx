import {keywords, title} from "@clover/public/utils/seo";
import LinkPage from "@/components/pages/link";
import { t } from '@easykit/common/utils/locale';

export const metadata = {
    title: title(t("快捷登录 - Github")),
    keywords: keywords(),
}

const Page = () => <LinkPage type={"github"} />

export default Page;
