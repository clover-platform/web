import {keywords, title} from "@clover/public/utils/seo";
import TaskGanttPage from "@/components/pages/task/gantt";
import {Metadata} from "next";
import { st } from "@clover/public/utils/locale.server";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: await title(await st("甘特图")),
    keywords: await keywords(),
  }
}

const Page = () => <TaskGanttPage/>;

export default Page;
