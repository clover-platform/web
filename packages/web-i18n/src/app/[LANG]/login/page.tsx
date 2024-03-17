import {keywords, title} from "@clover/public/utils/seo";
import {PublicLoginPage} from "@clover/public/components/pages/login";

export const metadata = {
    title: title("{#登录#}"),
    keywords: keywords(),
}

const Page = () => <PublicLoginPage />;

export default Page;
