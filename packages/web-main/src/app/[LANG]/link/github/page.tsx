import {keywords, title} from "@clover/public/utils/seo";
import LinkPage from "@/components/pages/link";

export const metadata = {
    title: title("{#快捷登录 - Github#}"),
    keywords: keywords(),
}

const Page = () => <LinkPage type={"github"} />

export default Page;
