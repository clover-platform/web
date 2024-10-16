import {keywords, title} from "@clover/public/utils/seo";
import TaskGanttPage from "@/components/pages/task/gantt";
import { t } from '@easykit/common/utils/locale';

export const metadata = {
    title: title(t("甘特图")),
    keywords: keywords(),
}

const Page = () => <TaskGanttPage />;

export default Page;
