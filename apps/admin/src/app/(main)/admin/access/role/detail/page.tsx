import {keywords, title} from "@clover/public/utils/seo";
import RoleDetailPage from "@/components/pages/access/role/detail";
import { t } from '@easykit/common/utils/locale'

export const metadata = {
    title: title(t("角色详情")),
    keywords: keywords(),
}

const Page = () => <RoleDetailPage />;

export default Page;
