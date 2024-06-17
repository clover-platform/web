import {keywords, title} from "@clover/public/utils/seo";
import TaskGanttPage from "@/components/pages/task/gantt";

export const metadata = {
    title: title("{#甘特图#}"),
    keywords: keywords(),
}

const Page = () => <TaskGanttPage />;

export default Page;
