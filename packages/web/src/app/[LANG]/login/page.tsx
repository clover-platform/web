import {keywords, title} from "@/utils/seo";
import LoginPage from "@/components/pages/login";

export const metadata = {
    title: title("{#登录#}"),
    keywords: keywords(),
}

const Page = () => <LoginPage />;

export default Page;
