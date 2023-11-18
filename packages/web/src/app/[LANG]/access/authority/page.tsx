import {keywords, title} from "@/utils/seo";
import AuthorityPage from "@/components/pages/access/authority";

export const metadata = {
    title: title("{#权限管理#}"),
    keywords: keywords(),
}

const Page = () => <AuthorityPage />;

export default Page;
