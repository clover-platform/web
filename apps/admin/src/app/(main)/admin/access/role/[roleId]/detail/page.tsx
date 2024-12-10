import {keywords, title} from "@clover/public/utils/seo";
import RoleDetailPage from "@/components/pages/access/role/detail";
import { t } from '@clover/public/locale'
import {Metadata} from "next";
import {FC} from "react";
import {roleDetail} from "@/rest/access";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: title(t("角色详情")),
        keywords: keywords(),
    }
}

const Page: FC<{
    params: Promise<{roleId: string}>;
}> = async (props) => {
    const { roleId } = await props.params;
    const { data } = await roleDetail(Number(roleId));
    return <RoleDetailPage data={data!} />;
};

export default Page;
