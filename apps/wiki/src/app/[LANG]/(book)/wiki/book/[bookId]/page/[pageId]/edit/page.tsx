import {keywords, title} from "@clover/public/utils/seo";
import {EditPage} from "@/components/pages/book/page/edit";

export const metadata = {
    title: title(t("编辑")),
    keywords: keywords(),
}

const Page = () => <EditPage />

export default Page;
