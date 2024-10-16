import {keywords, title} from "@clover/public/utils/seo";
import {ActivityPage} from "@/components/pages/activity";

export const metadata = {
    title: title(t("动态")),
    keywords: keywords(),
}

const Page = () => <ActivityPage />

export default Page;
