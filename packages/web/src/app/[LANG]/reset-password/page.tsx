import {keywords, title} from "@/utils/seo";
import ResetPasswordPage from "@/components/pages/reset-password";

export const metadata = {
    title: title("{#找回密码#}"),
    keywords: keywords(),
}

const Page = () => <ResetPasswordPage />

export default Page;
