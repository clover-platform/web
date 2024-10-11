'use client';

import { TitleBar } from "@clover/public/components/common/title-bar";
import {Button, Space, useMessage} from "@easykit/design";
import BackButton from "@easy-kit/common/components/button/back";
import ModuleForm from "@/components/pages/module/form";
import { useState } from "react";
import {create} from "@/rest/module";
import {useRouter} from "next/navigation";
import {useLayoutConfig} from "@clover/public/components/layout/hooks/use.layout.config";
import {MainLayoutProps} from "@/components/layout/main";

export const CreateModulePage = () => {
    useLayoutConfig<MainLayoutProps>({
        active: "i18n",
        path: [
            {
                title: "{#国际化#}",
                type: "link",
                href: "/{#LANG#}/i18n/"
            },
            {
                title: "{#创建模块#}",
                type: "item",
            }
        ],
    })
    const [loading, setLoading] = useState(false);
    const msg = useMessage();
    const router = useRouter();

    const onSubmit = async (data: any) => {
        setLoading(true);
        const { success, message } = await create(data);
        setLoading(false);
        if(success) {
            router.push("/{#LANG#}/i18n/");
        }else{
            msg.error(message)
        }
    }

    return <>
        <TitleBar title={"{#创建模块#}"} />
        <ModuleForm onSubmit={onSubmit}>
            <Space>
                <Button loading={loading} type={"submit"}>{"{#提交#}"}</Button>
                <BackButton />
            </Space>
        </ModuleForm>
    </>
}
