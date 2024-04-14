import {keywords, title} from "@clover/public/utils/seo";
import {BundlePage} from "@/components/pages/bundle";

export const metadata = {
    title: title("{#下载#}"),
    keywords: keywords(),
}

const Page = () => <BundlePage />

export default Page;
