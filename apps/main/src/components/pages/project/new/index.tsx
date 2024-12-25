'use client';

import {useLayoutConfig} from "@clover/public/components/layout/hooks/use.layout.config";
import {MainLayoutProps} from "@/components/layout/main";
import {t} from "@clover/public/locale";
import {TitleBar} from "@clover/public/components/common/title-bar";
import {ProjectForm} from "@/components/pages/project/form";
import {Button, Space} from "@easykit/design";
import BackButton from "@clover/public/components/common/button/back";
import {useCallback, useState} from "react";

export const NewProjectPage = () => {
    useLayoutConfig<MainLayoutProps>({
        active: "project",
        path: [
            {
                title: t("项目"),
                type: "link",
                href: "/project",
            },
            {
                title: t("新建"),
                type: "item",
            }
        ],
    })
    const [loading, setLoading] = useState(false);

    const onSubmit = useCallback(() => {

    }, [])

    return <>
        <TitleBar title={t("新建项目")} />
        <ProjectForm onSubmit={onSubmit}>
            <Space>
                <Button loading={loading} type={"submit"}>{t("提交")}</Button>
                <BackButton />
            </Space>
        </ProjectForm>
    </>
}