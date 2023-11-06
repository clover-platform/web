import {keywords, title} from "@/utils/seo";
import RegisterPage from "@/components/pages/register";

export const metadata = {
    title: title("{#注册#}"),
    keywords: keywords(),
}

const Page = () => <RegisterPage />;

export default Page;
