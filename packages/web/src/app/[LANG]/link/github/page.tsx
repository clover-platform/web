import {keywords, title} from "@/utils/seo";
import LinkPage from "@/components/pages/link";

export const metadata = {
    title: title("{#快捷登录 - Github#}"),
    keywords: keywords(),
}

const Page = () => <LinkPage />

export default Page;
