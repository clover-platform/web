import {keywords, title} from "@clover/public/utils/seo";
import RegisterPage from "@/components/pages/register";
import { t } from '@easykit/common/utils/locale';

export const metadata = {
    title: title(t("注册")),
    keywords: keywords(),
}

const Page = () => <RegisterPage />;

export default Page;
