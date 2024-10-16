import {keywords, title} from "@clover/public/utils/seo";
import RegisterPage from "@/components/pages/register";

export const metadata = {
    title: title(t("注册")),
    keywords: keywords(),
}

const Page = () => <RegisterPage />;

export default Page;
