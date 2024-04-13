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
    Input,
    Separator,
    Textarea, useAlert, useMessage
} from "@atom-ui/core";
import {INFO_SCHEMA} from "@/config/pages/module/form";
import {deleteModule} from "@/rest/module";
import {useRouter, useSearchParams} from "next/navigation";
import {useMemo, useState} from "react";
import {BaseInfo} from "@/types/pages/module";

const defaultValues = {
    name: "",
    description: ""
};

export const ModuleSettingPage = () => {
    const search = useSearchParams();
    const id = search.get("id");
    const alert = useAlert();
    const msg = useMessage();
    const router = useRouter();
    const [info, setInfo] = useState<BaseInfo>(defaultValues);
    const [values, setValues] = useState<BaseInfo>(defaultValues);
    const onSubmit = async (data: any) => {

    }

    const changed = useMemo(() => {
        // 比较两个对象的属性值一致
        return JSON.stringify(info) !== JSON.stringify(values);
    }, [info, values])

    const remove = () => {
        alert.confirm({
            title: "{#删除#}",
            description: "{#删除该翻译项目，所以的翻译数据将无法使用，是否继续？#}",
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
            title={"{#设置#}"}
            border={false}
        />
        <SettingTabsTitle active={"general"} />
        <div className={"space-y-4"}>
            <div className={"text-lg font-medium"}>{"{#基本信息#}"}</div>
            <Form
                schema={INFO_SCHEMA}
                onSubmit={onSubmit}
                defaultValues={info}
                onValuesChange={(vs) => setValues(vs as BaseInfo)}
            >
                <FormItem name="name" label="{#名称#}" description={"{#唯一标识只能是小写字母和-，小写字母开头#}"}>
                    <Input placeholder={"{#请输入模块名称#}"} className={"max-w-96"} />
                </FormItem>
                <FormItem name="description" label="{#描述#}">
                    <Textarea placeholder="{#请输入模块描述#}" className={"max-w-6xl"} />
                </FormItem>
            </Form>
            <div>
                <Button disabled={!changed} variant={"default"}>{"{#保存#}"}</Button>
            </div>
            <Separator className={"!my-6"} />
            <div className={"text-lg font-medium"}>{"{#删除项目#}"}</div>
            <Alert variant={"destructive"}>
                <AlertDescription className={"space-x-2"}>
                    <Badge variant={"destructive"}>{"{#重要#}"}</Badge>
                    <span>{"{#删除项目将永久删除与该项目关联的所有资源，包括上传的文件、翻译、审批等。删除的项目无法恢复！#}"}</span>
                </AlertDescription>
            </Alert>
            <div>
                <Button onClick={remove} variant={"destructive"}>{"{#删除项目#}"}</Button>
            </div>
        </div>
    </>
}
