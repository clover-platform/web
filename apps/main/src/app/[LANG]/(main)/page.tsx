import {keywords, title} from "@clover/public/utils/seo";
import ProjectPage from "@/components/pages/project";

export const metadata = {
    title: title(t("首页")),
    keywords: keywords(),
}

const Page = () => <ProjectPage />

export default Page;
