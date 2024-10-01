import {keywords, title} from "@clover/public/utils/seo";
import {DetailPage} from "@/components/pages/book/page";

export const metadata = {
    title: title("{#详情#}"),
    keywords: keywords(),
}

const Page = () => <DetailPage />

export default Page;
