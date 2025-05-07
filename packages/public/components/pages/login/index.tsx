'use client';

import {t} from '@clover/public/utils/i18next';
import {LoginForm} from "@clover/public/components/pages/login/form";

export const PublicLoginPage = () => {
  return <div className={"w-[360px]"}>
    <div className={"flex justify-center items-center"}>
      <div className={"text-[24px] font-bold flex-1"}>{t("登录")}</div>
    </div>
    <div className={"mt-[30px]"}>
      <LoginForm passwordLabel={t("密码")} />
    </div>
  </div>
}
