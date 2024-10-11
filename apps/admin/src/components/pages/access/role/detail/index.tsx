'use client';

import {
    Card,
    Breadcrumbs,
    BreadcrumbsItem,
    FormItem,
    Switch, Form, Loading, ValueFormatter, Tree, Separator
} from "@easykit/design";
import Link from "@easy-kit/common/components/link";
import {useSearchParams} from "next/navigation";
import {useRole} from "@/components/pages/access/role/hooks";
import {toItems} from "@/components/pages/access/authority/form/utils";
import {useState} from "react";
import {RoleStatus} from "@/components/pages/access/role/status";

const RoleDetailPage = () => {
    const params = useSearchParams();
    const id = params.get("id");
    const [role, loading, key] = useRole(Number(id));
    const [expansion, setExpansion] = useState<string[]>([]);

    return <>
        <Breadcrumbs className={"mx-2"}>
            <BreadcrumbsItem>
                <Link href={"/{#LANG#}/access/"}>{"{#角色管理#}"}</Link>
            </BreadcrumbsItem>
            <BreadcrumbsItem>{"{#角色详情#}"}</BreadcrumbsItem>
        </Breadcrumbs>
        <Separator className={"my-4"} />
        <Loading loading={loading}>
            <div className={"w-[550px] mx-auto"}>
                <Form key={key} defaultValues={role}>
                    <FormItem name="name" label="{#名称#}">
                        <ValueFormatter />
                    </FormItem>
                    <FormItem name="description" label="{#描述#}">
                        <ValueFormatter />
                    </FormItem>
                    <FormItem name="enable" label={"{#启用状态#}"}>
                        <RoleStatus />
                    </FormItem>
                    <FormItem name="authorities" label={"{#关联接口#}"}>
                        <Tree
                            border={true}
                            items={toItems(role.authorityTree || [])}
                            selectable={false}
                            checkbox={false}
                            onExpandedChange={setExpansion}
                            expanded={expansion}
                        />
                    </FormItem>
                </Form>
            </div>
        </Loading>
    </>;
};

export default RoleDetailPage;
