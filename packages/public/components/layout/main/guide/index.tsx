import * as z from "zod";
import {useCallback, useState} from "react";
import {init, TeamInitData} from "@clover/public/rest/team";
import { t } from '@clover/public/locale';
import { IconCreateTeam } from "@arco-iconbox/react-clover";
import { IconTitle } from "@clover/public/components/common/icon-title";
import {Button, Form, FormItem, Input, Space, useMessage} from "@easykit/design";
import {useStateLoader} from "@clover/public/components/layout/hooks/use.state.loader";
import {USERNAME} from "@clover/public/utils/regular";

const SCHEMA = () => z.object({
  name: z.string()
    .min(1, t("团队名称不能为空"))
    .max(20, t("最多 20 个字符")),
  key: z.string()
    .min(4, t("4-20个字符"))
    .max(20, t("4-20个字符"))
    .regex(USERNAME, t("只能包含字母、数字、下划线，字母开头。")),
  projectName: z.string()
    .min(1, t("初始项目不能为空"))
    .max(50, t("最多 50 个字符")),
  projectKey: z.string()
    .min(4, t("4-20个字符"))
    .max(20, t("4-20个字符"))
    .regex(USERNAME, t("只能包含字母、数字、下划线，字母开头。")),
})


export const Guide = () => {
  const [loading, setLoading] = useState(false);
  const msg = useMessage();
  const loader = useStateLoader();
  const onSubmit = useCallback(async (data: TeamInitData) => {
    setLoading(true);
    const { success, message } = await init(data);
    if(success) {
      await loader();
    }else{
      msg.error(message);
    }
    setLoading(false);
  }, [loader, msg])

  const description = <>
    <div>{t("团队允许您在多个项目之间进行管理与协作。团队的成员拥有访问其中所有项目的权限。")}</div>
    <div>{t("创建团队时，您需要同时在团队下创建一个初始项目。")}</div>
  </>;
  return <div className={"w-full max-w-[680px]"}>
    <IconTitle
      icon={<IconCreateTeam fontSize={40} className={"text-primary"} />}
      title={t("创建团队")}
      description={description}
    />
    <Form
      schema={SCHEMA()}
      onSubmit={(data) => onSubmit(data as TeamInitData)}
      className={"mt-10"}
    >
      <FormItem name="name" label={t("团队名称")}>
        <Input placeholder={t("请输入")} />
      </FormItem>
      <FormItem name="key" label={t("唯一标识")}>
        <Input placeholder={t("请输入")} />
      </FormItem>
      <FormItem
        name="projectName" label={t("初始项目")}
        description={t("你需要为团队创建一个初始项目")}
      >
        <Input placeholder={t("请输入项目名称")} />
      </FormItem>
      <FormItem name="projectKey" label={t("项目唯一标识")}>
        <Input placeholder={t("请输入")} />
      </FormItem>
      <Space className={"justify-start"}>
        <Button loading={loading} type={"submit"}>{t("创建团队")}</Button>
      </Space>
    </Form>
  </div>
}
