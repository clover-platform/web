import {keywords, title} from "@/utils/seo";
import EditRolePage from "@/components/pages/access/role/edit";

export const metadata = {
    title: title("{#编辑角色#}"),
    keywords: keywords(),
}

const Page = () => <EditRolePage />;

export default Page;
