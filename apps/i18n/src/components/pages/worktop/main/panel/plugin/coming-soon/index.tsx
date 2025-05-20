import { IconComingSoon } from "@arco-iconbox/react-clover";
import { useTranslation } from "react-i18next";

export const ComingSoon = () => {
  const { t } = useTranslation();
  return <div className={"flex justify-center items-center flex-col p-6 space-y-2"}>
    <IconComingSoon className={"text-3xl opacity-60"} />
    <div className={"text-muted-foreground"}>{t("即将推出")}</div>
  </div>
}
