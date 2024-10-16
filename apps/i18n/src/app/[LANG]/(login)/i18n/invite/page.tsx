import {keywords, title} from "@clover/public/utils/seo";
import {InvitePage} from "@/components/pages/invite";

export const metadata = {
    title: title(t("加入翻译")),
    keywords: keywords(),
}

const Page = () => <InvitePage />;

export default Page;
