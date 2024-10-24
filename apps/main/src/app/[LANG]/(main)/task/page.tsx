import {keywords, title} from "@clover/public/utils/seo";
import TaskPage from "@/components/pages/task";
import { t } from '@easykit/common/utils/locale';

export const metadata = {
    title: title(t("任务列表")),
    keywords: keywords(),
}

const Page = () => <TaskPage />;

export default Page;
