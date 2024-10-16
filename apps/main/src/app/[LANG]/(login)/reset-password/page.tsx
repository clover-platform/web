import {keywords, title} from "@clover/public/utils/seo";
import ResetPasswordPage from "@/components/pages/reset-password";

export const metadata = {
    title: title(t("找回密码")),
    keywords: keywords(),
}

const Page = () => <ResetPasswordPage />

export default Page;
