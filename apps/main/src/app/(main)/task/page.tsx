import {keywords, title} from "@clover/public/utils/seo";
import TaskPage from "@/components/pages/task";
import {Metadata} from "next";
import { st } from "@clover/public/utils/locale.server";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: await title(await st("任务列表")),
    keywords: await keywords(),
  }
}

const Page = () => <TaskPage/>;

export default Page;
