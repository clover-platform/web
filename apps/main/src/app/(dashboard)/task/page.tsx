import {keywords, title} from "@clover/public/utils/seo";
import TaskPage from "@/components/pages/task";
import {t} from '@clover/public/locale';
import {Metadata} from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: title(t("任务列表")),
    keywords: keywords(),
  }
}

const Page = () => <TaskPage/>;

export default Page;
