'use client';

import {TitleBar} from "@clover/public/components/common/title-bar";
import { Button, Space, useMessage } from "@atom-ui/core";
import BackButton from "@easy-kit/common/components/button/back";
import {useState} from "react";
import {BundleForm} from "@/components/pages/bundle/form";
import { create, AddBundleData } from "@/rest/bundle";
import { useRouter, useSearchParams } from "next/navigation";

export const AddBundlePage = () => {
    const search = useSearchParams();
    const id = search.get("id");
    const [loading, setLoading] = useState(false);
    const msg = useMessage();
    const router = useRouter();

    const onSubmit = async (data: AddBundleData) => {
        setLoading(true);
        data.moduleId = Number(id);
        const { success, message } = await create(data);
        setLoading(false);
        if(success) {
            router.push("/{#LANG#}/i18n/bundle/?id=" + id);
        }else{
            msg.error(message);
        }
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
