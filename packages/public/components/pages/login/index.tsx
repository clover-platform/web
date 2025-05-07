'use client';

import {LoginForm} from "@clover/public/components/pages/login/form";
import { useTranslation } from "react-i18next";
export const PublicLoginPage = () => {
  const { t } = useTranslation();
  return <div className={"w-[360px]"}>
    <div className={"flex justify-center items-center"}>
      <div className={"text-[24px] font-bold flex-1"}>{t("登录")}</div>
    </div>
    <div className={"mt-[30px]"}>
      <LoginForm passwordLabel={t("密码")} />
    </div>
  </div>
}
