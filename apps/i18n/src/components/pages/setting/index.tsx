'use client';

import {SettingTabsTitle} from "@/components/pages/setting/tabs-title";
import {TitleBar} from "@clover/public/components/common/title-bar";
import {
    Alert,
    AlertDescription,
    Badge,
    Button,
    Form,
    FormItem,
    Input, Loading,
    Separator,
    Textarea, useAlert, useMessage
} from "@easykit/design";
import {INFO_SCHEMA} from "@/config/pages/module/form";
import {deleteModule, detail, update} from "@/rest/module";
import {useRouter, useSearchParams} from "next/navigation";
import {useEffect, useMemo, useRef, useState} from "react";
import {BaseInfo, UpdateInfo} from "@/types/pages/module";
import {useLayoutConfig} from "@clover/public/components/layout/hooks/use.layout.config";
import {ModuleLayoutProps} from "@/components/layout/module";
import { t } from '@easykit/common/utils/locale';

export const ModuleSettingPage = () => {
    useLayoutConfig<ModuleLayoutProps>({
        active: "setting",
        path: [
            {
                title: t("设置"),
                type: "link",
                href: "/{#LANG#}/i18n/setting/",
                withQuery: true,
            },
            {
                title: t("常规"),
                type: "item",
            }
        ],
    })
    const search = useSearchParams();
    const id = search.get("id");
    const alert = useAlert();
    const msg = useMessage();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [info, setInfo] = useState<BaseInfo>();
    const [values, setValues] = useState<BaseInfo>();
    const [formKey, setFormKey] = useState(Date.now());
    const [submitting, setSubmitting] = useState(false);

    const load = async () => {
        setLoading(true);
        const { success, data } = await detail(Number(id));
        if(success) {
            setInfo(data!);
            setValues(data!);
            setFormKey(Date.now());
        }
        setLoading(false);
    }

    useEffect(() => {
        load().then();
    }, []);

    const changed = useMemo(() => {
        return JSON.stringify(info) !== JSON.stringify(values);
    }, [info, values])

    const onSubmit = async (data: UpdateInfo) => {
        data.id = info?.id!;
        setSubmitting(true);
        const { success, message } = await update(data);
        setSubmitting(false);
        if(success) {
            load().then();
        }else{
            msg.error(message);
        }
    }

    const remove = () => {
        alert.confirm({
            title: t("删除"),
            description: t("删除该翻译项目，所以的翻译数据将无法使用，是否继续？"),
            onOk: async () => {
                const { success, message } = await deleteModule(Number(id));
                if(success) {
                    router.push("/{#LANG#}/i18n/");
                }else{
                    msg.error(message);
                }
                return success;
            }
        })
    }

    return <>
        <TitleBar
            title={t("设置")}
            border={false}
        />
        <SettingTabsTitle active={"general"} />
        <Loading loading={loading} className={"space-y-4"}>
            <div className={"text-lg font-medium"}>{t("基本信息")}</div>
            <Form<UpdateInfo>
                key={formKey}
                schema={INFO_SCHEMA}
                onSubmit={onSubmit}
                defaultValues={info}
                onValuesChange={(vs) => setValues(vs)}
            >
                <FormItem name="name" label={t("名称")} description={t("唯一标识只能是小写字母和-，小写字母开头")}>
                    <Input placeholder={t("请输入模块名称")} className={"max-w-96"}/>
                </FormItem>
                <FormItem name="description" label={t("描述")}>
                    <Textarea placeholder={t("请输入模块描述")} className={"max-w-6xl"}/>
                </FormItem>
                <div>
                    <Button loading={submitting} disabled={!changed} variant={"default"}>{t("保存")}</Button>
                </div>
            </Form>
            <Separator className={"!my-6"}/>
            <div className={"text-lg font-medium"}>{t("删除项目")}</div>
            <Alert variant={"destructive"}>
                <AlertDescription className={"space-x-2"}>
                    <Badge variant={"destructive"}>{t("重要")}</Badge>
                    <span>{t("删除项目将永久删除与该项目关联的所有资源，包括上传的文件、翻译、审批等。删除的项目无法恢复！")}</span>
                </AlertDescription>
            </Alert>
            <div>
                <Button onClick={remove} variant={"destructive"}>{t("删除项目")}</Button>
            </div>
        </Loading>
    </>
}
