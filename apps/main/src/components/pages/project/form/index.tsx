import {Form, FormItem, Input} from "@easykit/design";
import {t} from "@clover/public/locale";
import {FC, PropsWithChildren} from "react";
import {getSchema} from "@/config/pages/project/form";

export type ProjectFormProps = PropsWithChildren<{
  onSubmit?: (data: any) => void;
  defaultValues?: any;
}>

export const ProjectForm: FC<ProjectFormProps> = (props) => {
  const {
    defaultValues = {}
  } = props;

  return <Form
    schema={getSchema()}
    onSubmit={props.onSubmit}
    defaultValues={defaultValues}
  >
    <FormItem name="name" label={t("名称")}>
      <Input placeholder={t("请输入项目名称")} className={"max-w-96"}/>
    </FormItem>
    <FormItem name="key" label={t("标识")} description={t("唯一标识只能是小写字母和-，小写字母开头")}>
      <Input placeholder={t("请输入唯一标识")} className={"max-w-96"}/>
    </FormItem>
    <FormItem name="teamId" label={t("所属团队")}>
      <div>team</div>
    </FormItem>
    {props.children}
  </Form>
}
