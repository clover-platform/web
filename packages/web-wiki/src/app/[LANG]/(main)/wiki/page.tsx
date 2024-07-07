import {keywords, title} from "@clover/public/utils/seo";
import {IndexPage} from "@/components/pages/home";

export const metadata = {
    title: title("{#首页#}"),
    keywords: keywords(),
}

const Page = () => <IndexPage />

export default Page;
