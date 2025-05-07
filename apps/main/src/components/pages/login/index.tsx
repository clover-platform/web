'use client';

import {Divider} from "@easykit/design";
import Quick from "@/components/pages/login/quick";
import LoginLink from "@/components/common/login/link";
import {LoginForm} from "@clover/public/components/pages/login/form";
import { useTranslation } from 'react-i18next';
const LoginPage = () => {
  const { t } = useTranslation();
  const passwordLabel = <div className={"flex justify-center items-center"}>
    <div className={"flex-1"}>{t("密码")}</div>
    <div className={"ml-[10px]"}>
      <LoginLink href={`/reset-password`} tabIndex={-1}>{t("找回密码")}</LoginLink>
    </div>
  </div>
  return <div className={"w-[360px]"}>
    <div className={"flex justify-center items-center"}>
      <div className={"text-xl font-bold flex-1"}>{t("登录")}</div>
      <div className={"ml-[10px] space-x-1"}>
        <span>{t("没有账号？")}</span>
        <LoginLink href={`/register`}>{t("注册")}</LoginLink>
      </div>
    </div>
    <div className={"mt-[30px]"}>
      <LoginForm passwordLabel={passwordLabel} />
    </div>
    <Divider orientation={"center"}>{t("第三方快捷登录")}</Divider>
    <Quick/>
  </div>
};

export default LoginPage;
