import {keywords, title} from "@clover/public/utils/seo";
import AuthorityPage from "@/components/pages/access/authority";
import { t } from '@easykit/common/utils/locale'

export const metadata = {
    title: title(t("权限管理")),
    keywords: keywords(),
}

const Page = () => <AuthorityPage />;

export default Page;
