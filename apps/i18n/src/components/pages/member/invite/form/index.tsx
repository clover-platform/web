import { Form, FormItem, Textarea } from "@easykit/design";
import { FC, PropsWithChildren } from "react";
import { getSchema } from "@/config/pages/member/form";
import { RoleSelect } from "@/components/pages/member/invite/form/role-select";
import { MemberInviteRequest } from "@/types/pages/member";
import { useTranslation } from "react-i18next";

export type MemberInviteFormProps = PropsWithChildren<{
  onSubmit?: (data: any) => void;
  defaultValues?: any;
  onValuesChange?: (values: MemberInviteRequest) => void;
}>;

export const MemberInviteForm: FC<MemberInviteFormProps> = (props) => {
  const {
    defaultValues = {
      roles: ['3']
    }
  } = props;
  const { t } = useTranslation();

  return <Form
    schema={getSchema()}
    onSubmit={props.onSubmit}
    defaultValues={defaultValues}
    onValuesChange={(e) => props.onValuesChange?.(e as MemberInviteRequest)}
  >
    <FormItem name="roles" label={t("角色")}>
      <RoleSelect />
    </FormItem>
    <FormItem name="emails" label={t("邮箱")} description={t("多个邮箱请使用英文,隔开")}>
      <Textarea placeholder={"tom@demo.com,jane@demo.com"} />
    </FormItem>
    <FormItem name="content" label={t("内容")} description={t("将作为邮件的附加消息进行发送。")}>
      <Textarea placeholder={t("请输入")} />
    </FormItem>
    {props.children}
  </Form>
}
