'use client';

import {LoginForm} from "@clover/public/components/pages/login/form";
import { useTranslation } from "react-i18next";
export const PublicLoginPage = () => {
  const { t } = useTranslation();
  return (
    <div className="w-[360px]">
      <div className="flex items-center justify-center">
        <div className="flex-1 font-bold text-[24px]">{t('登录')}</div>
      </div>
      <div className="mt-[30px]">
        <LoginForm passwordLabel={t('密码')} />
      </div>
    </div>
  )
}
