import { Form, FormItem } from "@easykit/design";
import { FC, PropsWithChildren } from "react";
import { getSchema } from "@/config/pages/entry/edit/form";
import TextareaAutosize from "react-textarea-autosize";
import { useTranslation } from "react-i18next";
export interface EntryEditFormProps extends PropsWithChildren {
  onSubmit?: (data: any) => void;
  defaultValues?: any;
}

export const EntryEditForm: FC<EntryEditFormProps> = (props) => {
  const {
    defaultValues = {}
  } = props;
  const { t } = useTranslation();

  return <Form
    schema={getSchema()}
    onSubmit={props.onSubmit}
    defaultValues={defaultValues}
  >
    <FormItem name="value" label={t("词条")}>
      <TextareaAutosize
        minRows={3}
        placeholder={t("请输入原始语言词条")}
        className={"p-2 border w-full rounded-md"}
      />
    </FormItem>
    {props.children}
  </Form>
}
