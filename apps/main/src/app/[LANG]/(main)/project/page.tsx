import {keywords, title} from "@clover/public/utils/seo";
import ProjectPage from "@/components/pages/project";
import { t } from '@easykit/common/utils/locale';

export const metadata = {
    title: title(t("项目管理")),
    keywords: keywords(),
}

const Page = () => <ProjectPage />;

export default Page;
