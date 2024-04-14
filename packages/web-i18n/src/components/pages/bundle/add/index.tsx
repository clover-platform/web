'use client';

import {TitleBar} from "@clover/public/components/common/title-bar";
import {Button, Space} from "@atom-ui/core";
import BackButton from "@easy-kit/common/components/button/back";
import {useState} from "react";
import {BundleForm} from "@/components/pages/bundle/form";

export const AddBundlePage = () => {
    const [loading, setLoading] = useState(false);
    const onSubmit = async (data: any) => {
        console.log(data);
    }

    return <>
        <TitleBar title={"{#添加文件#}"} />
        <BundleForm onSubmit={onSubmit}>
            <Space>
                <Button loading={loading} type={"submit"}>{"{#提交#}"}</Button>
                <BackButton />
            </Space>
        </BundleForm>
    </>
}
