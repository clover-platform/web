import {keywords, title} from "@clover/public/utils/seo";
import EditRolePage from "@/components/pages/access/role/edit";
import { t } from '@easykit/common/utils/locale'

export const metadata = {
    title: title(t("编辑角色")),
    keywords: keywords(),
}

const Page = () => <EditRolePage />;

export default Page;
