import {keywords, title} from "@clover/public/utils/seo";
import { t } from '@easykit/common/utils/locale';
import {Metadata} from "next";
import {AccessTokensCreatePage} from "@/components/pages/profile/access/tokens/create";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: title(t("创建访问令牌")),
        keywords: keywords(),
    }
}

const Page = () => <AccessTokensCreatePage />

export default Page;
