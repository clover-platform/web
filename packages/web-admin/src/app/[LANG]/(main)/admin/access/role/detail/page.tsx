import {keywords, title} from "@clover/public/utils/seo";
import RoleDetailPage from "@/components/pages/access/role/detail";

export const metadata = {
    title: title("{#角色详情#}"),
    keywords: keywords(),
}

const Page = () => <RoleDetailPage />;

export default Page;
