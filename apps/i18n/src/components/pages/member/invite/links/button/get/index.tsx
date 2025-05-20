import { Button, useMessage } from "@easykit/design";
import { FC, useState } from "react";
import { generate } from "@/rest/member.invite";
import copy from 'copy-to-clipboard';
import { useModule } from "@/hooks/use.module";
import { useTranslation } from "react-i18next";
export type GetInviteLinkButtonProps = {
  disabled: boolean;
  roles: string[];
};

export const GetInviteLinkButton: FC<GetInviteLinkButtonProps> = (props) => {
  const [loading, setLoading] = useState(false);
  const m = useModule();
  const msg = useMessage();
  const { t } = useTranslation();

  const doGenerate = async () => {
    setLoading(true);
    const { success, message, data } = await generate({
      module: m,
      roles: props.roles
    });
    setLoading(false);
    if (success) {
      const url = `${window.location.origin}/i18n/invite/?t=${data}`;
      copy(url);
      msg.success(t("邀请链接已复制"));
    } else {
      msg.error(message);
    }
  }

  return <Button
    disabled={props.disabled}
    loading={loading}
    type={"button"} variant={"outline"}
    onClick={doGenerate}
  >
    {t("获取链接")}
  </Button>
}
