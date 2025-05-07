import Logo from "@clover/public/components/common/logo";
import { useTranslation } from 'react-i18next';

export const LayoutLogo = () => {
  const { t } = useTranslation();
  return <div className={"flex justify-start items-center space-x-xs"}>
    <Logo/>
    <div className={"text-xl font-medium opacity-70"}>{t("幸运草")}</div>
  </div>
}
