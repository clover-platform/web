import {Alert, Button, Form, FormItem, Input, Space} from "@easykit/design";
import {getSchema} from "@/config/pages/team/form";
import BackButton from "@clover/public/components/common/button/back";
import {useFormSubmit} from "@clover/public/hooks/use.form.submit";
import {create, CreateTeamData} from "@/rest/team";
import {useRouter} from "next/navigation";
import {useStateLoader} from "@clover/public/components/layout/hooks/use.state.loader";
import {ImageCropper} from "@clover/public/components/common/cropper";
import { useTranslation } from "react-i18next";

export const TeamForm = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const load = useStateLoader();
  const {ref, submitting, onSubmit} = useFormSubmit<any,CreateTeamData>({
    action: create,
    onSuccess: () => {
      router.push("/team");
      load().then();
    }
  })

  return <Form
    ref={ref}
    schema={getSchema()}
    onSubmit={onSubmit}
  >
    <FormItem name="cover" label={t("图标")}>
      <ImageCropper className={"w-20 h-20"} />
    </FormItem>
    <FormItem name="name" label={t("名称")}>
      <Input placeholder={t("请输入")} className={"max-w-96"}/>
    </FormItem>
    <FormItem name="teamKey" label={t("标识")} description={t("4-20字符，只能是小写字母和-，小写字母开头")}>
      <Input placeholder={t("请输入")} className={"max-w-96"}/>
    </FormItem>
    <Alert className={"bg-secondary text-secondary-foreground"}>{t(`将会同时创建名为“默认项目”的初始项目。`)}</Alert>
    <Space>
      <Button loading={submitting} type={"submit"}>{t("提交")}</Button>
      <BackButton/>
    </Space>
  </Form>
}
