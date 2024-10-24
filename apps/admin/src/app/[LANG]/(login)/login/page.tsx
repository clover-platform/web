import {keywords, title} from "@clover/public/utils/seo";
import {LoginPage} from "@/components/pages/login";
import { t } from '@easykit/common/utils/locale'

export const metadata = {
    title: title(t("登录")),
    keywords: keywords(),
}

const Page = () => <LoginPage />;

export default Page;
