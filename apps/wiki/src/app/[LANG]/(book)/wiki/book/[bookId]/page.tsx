import {keywords, title} from "@clover/public/utils/seo";
import {BookPage} from "@/components/pages/book";

export const metadata = {
    title: title("{#知识库#}"),
    keywords: keywords(),
}

const Page = () => <BookPage />

export default Page;
