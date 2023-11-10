import {keywords, title} from "@/utils/seo";
import LinkPage from "@/components/pages/link";

export const metadata = {
    title: title("{#快捷登录 - 微信#}"),
    keywords: keywords(),
}

const Page = () => <LinkPage type={"wechat"} />

export default Page;
