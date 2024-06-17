import {keywords, title} from "@clover/public/utils/seo";
import RolePage from "@/components/pages/access/role";

export const metadata = {
    title: title("{#角色管理#}"),
    keywords: keywords(),
}

const Page = () => <RolePage />;

export default Page;
