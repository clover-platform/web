import {keywords, title} from "@clover/public/utils/seo";
import AddRolePage from "@/components/pages/access/role/add";

export const metadata = {
    title: title("{#添加角色#}"),
    keywords: keywords(),
}

const Page = () => <AddRolePage />;

export default Page;
