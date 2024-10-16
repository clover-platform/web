import {keywords, title} from "@clover/public/utils/seo";
import RolePage from "@/components/pages/access/role";
import { t } from '@easykit/common/utils/locale'

export const metadata = {
    title: title(t("角色管理")),
    keywords: keywords(),
}

const Page = () => <RolePage />;

export default Page;
