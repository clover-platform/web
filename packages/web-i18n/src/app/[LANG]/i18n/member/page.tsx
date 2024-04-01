import {keywords, title} from "@clover/public/utils/seo";
import { MemberPage } from "@/components/pages/member";

export const metadata = {
    title: title("{#成员#}"),
    keywords: keywords(),
}

const Page = () => <MemberPage />

export default Page;
