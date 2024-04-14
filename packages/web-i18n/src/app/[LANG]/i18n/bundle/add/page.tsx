import {keywords, title} from "@clover/public/utils/seo";
import {AddBundlePage} from "@/components/pages/bundle/add";

export const metadata = {
    title: title("{#添加文件#}"),
    keywords: keywords(),
}

const Page = () => <AddBundlePage />

export default Page;
