'use client'

import LoginLink from '@/components/common/login/link'
import { LoginForm } from '@clover/public/components/pages/login/form'
import { Divider } from '@easykit/design'
import { useTranslation } from 'react-i18next'
import Quick from './quick'

const LoginPage = () => {
  const { t } = useTranslation()
  const passwordLabel = (
    <div className="flex items-center justify-center">
      <div className="flex-1">{t('密码')}</div>
      <div className="ml-[10px]">
        <LoginLink href="/reset-password" tabIndex={-1}>
          {t('找回密码')}
        </LoginLink>
      </div>
    </div>
  )
  return (
    <div className="w-[360px]">
      <div className="flex items-center justify-center">
        <div className="flex-1 font-bold text-xl">{t('登录')}</div>
        <div className="ml-[10px] space-x-1">
          <span>{t('没有账号？')}</span>
          <LoginLink href="/register">{t('注册')}</LoginLink>
        </div>
      </div>
      <div className="mt-[30px]">
        <LoginForm passwordLabel={passwordLabel} />
      </div>
      <Divider orientation="center">{t('第三方快捷登录')}</Divider>
      <Quick />
    </div>
  )
}

export default LoginPage
