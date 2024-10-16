import {keywords, title} from "@clover/public/utils/seo";
import AddRolePage from "@/components/pages/access/role/add";
import { t } from '@easykit/common/utils/locale'

export const metadata = {
    title: title(t("添加角色")),
    keywords: keywords(),
}

const Page = () => <AddRolePage />;

export default Page;
