'use client';

import { TitleBar } from "@clover/public/components/common/title-bar";
import { Button, Space } from "@atom-ui/core";
import BackButton from "@easy-kit/common/components/button/back";
import ModuleForm from "@/components/pages/module/form";
import { useState } from "react";

export const CreateModulePage = () => {
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data: any) => {
        console.log(data);
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
