'use client';

import {TitleBar} from "@clover/public/components/common/title-bar";
import { Button, Space, useMessage } from "@easykit/design";
import BackButton from "@easykit/common/components/button/back";
import {useState} from "react";
import {BundleForm} from "@/components/pages/bundle/form";
import { create, AddBundleData } from "@/rest/bundle";
import { useRouter, useSearchParams } from "next/navigation";
import {useLayoutConfig} from "@clover/public/components/layout/hooks/use.layout.config";
import {ModuleLayoutProps} from "@/components/layout/module";
import { t } from '@easykit/common/utils/locale';

export const AddBundlePage = () => {
    useLayoutConfig<ModuleLayoutProps>({
        active: "download",
        path: [
            {
                title: t("下载"),
                type: "link",
                href: "/{#LANG#}/i18n/bundle/",
                withQuery: true,
            },
            {
                title: t("添加文件"),
                type: "item",
            }
        ],
    })
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
        <TitleBar title={t("添加文件")} />
        <BundleForm onSubmit={onSubmit}>
            <Space>
                <Button loading={loading} type={"submit"}>{t("提交")}</Button>
                <BackButton />
            </Space>
        </BundleForm>
    </>
}
