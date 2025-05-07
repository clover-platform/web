import {keywords, title} from "@clover/public/utils/seo";
import TaskGanttPage from "@/components/pages/task/gantt";
import {t} from '@clover/public/utils/i18next';
import {Metadata} from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: title(t("甘特图")),
    keywords: keywords(),
  }
}

const Page = () => <TaskGanttPage/>;

export default Page;
