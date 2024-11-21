import {keywords, title} from "@clover/public/utils/seo";
import EditRolePage from "@/components/pages/access/role/edit";
import { t } from '@easykit/common/utils/locale'
import {Metadata} from "next";
import {FC} from "react";
import {roleDetail} from "@/rest/access";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: title(t("编辑角色")),
        keywords: keywords(),
    }
}

const Page: FC<{
    params: Promise<{roleId: string}>;
}> = async (props) => {
    const { roleId } = await props.params;
    const { success, data } = await roleDetail(Number(roleId));
    if(success && data) {
        data.authorities = data.authorities.map((item) => `${item}`);
    }
    return <EditRolePage data={data!} />
}

export default Page;
