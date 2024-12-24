import { IconCreateTeam } from "@arco-iconbox/react-clover";
import { IconTitle } from "@clover/public/components/common/icon-title";
import {Button, Divider, Form, FormItem, Input, Space, useMessage} from "@easykit/design";
import * as z from "zod";
import {FC, useState} from "react";
import {init, TeamInitData} from "@clover/public/rest/team";
import {t, tt} from '@clover/public/locale';
import {useStateLoader} from "@clover/public/components/layout/hooks/use.state.loader";

const checkKey = (key: string, name: string, ctx: any) => {
    if (!/^[a-z][0-9a-z-]*$/.test(key)) {
        ctx.addIssue({
            code: 'custom',
            path: [name],
            message: t("唯一标识只能是小写字母、数字和-，小写字母开头")
        })
    }
}

const getSchema = () => z.object({
    name: z.string()
        .min(1, t("团队名称不能为空"))
        .max(20, t("最多 20 个字符")),
    key: z.string(),
    projectName: z.string()
        .min(1, t("初始项目不能为空"))
        .max(50, t("最多 50 个字符")),
    projectKey: z.string(),
}).superRefine(({key, projectKey}, ctx) => {
    checkKey(key, 'key', ctx);
    checkKey(projectKey, 'projectKey', ctx);
})

export type GuideCreateProps = {
    onBack: () => void;
}

export const GuideCreate: FC<GuideCreateProps> = (props) => {
    const [loading, setLoading] = useState(false);
    const loader = useStateLoader();
    const msg = useMessage();
    const onSubmit = async (data: TeamInitData) => {
        setLoading(true);
        const { success, message } = await init(data);
        if(success) {
            await loader();
        }else{
            msg.error(message);
        }
        setLoading(false);
    }

    const description = <div className={"text-sm"}>
        <div>{t("团队允许您在多个项目之间进行管理与协作。团队的成员拥有访问其中所有项目的权限。")}</div>

    </div>;
    return <div className={"w-full max-w-[500px] py-lg"}>
        <IconTitle
            icon={<IconCreateTeam fontSize={40} className={"text-primary"} />}
            title={t("创建团队")}
            description={description}
        />
        <Form
            schema={getSchema()}
            onSubmit={(data) => onSubmit(data as TeamInitData)}
            className={"mt-10"}
        >
            <Divider orientation={"left"}>{t("团队信息")}</Divider>
            <FormItem name="name" label={t("名称")}>
                <Input placeholder={t("请输入团队名称")}/>
            </FormItem>
            <FormItem name="key" label={t("唯一标识")}>
                <Input placeholder={t("请输入唯一标识")}/>
            </FormItem>
            <Divider orientation={"left"}>{t("初始项目")}</Divider>
            <div className={"text-sm text-secondary-foreground"}>{t("创建团队时，您需要同时在团队下创建一个初始项目。")}</div>
            <FormItem
                name="projectName" label={t("项目")}
                description={t("你需要为团队创建一个初始项目")}
            >
                <Input placeholder={t("请输入项目名称")}/>
            </FormItem>
            <FormItem name="projectKey" label={t("唯一标识")}>
                <Input placeholder={t("请输入唯一标识")}/>
            </FormItem>
            <Space className={"justify-start mb-md"}>
                <Button loading={loading} type={"submit"}>{t("创建团队")}</Button>
                <Button variant={"outline"} type={"button"} onClick={props.onBack}>{tt("返回")}</Button>
            </Space>
        </Form>
    </div>
}
