'use client'

import type { MainLayoutProps } from '@/components/layout/main'
import { ProfileBreadcrumbBase } from '@/components/pages/profile/breadcrumb-base'
import { Page } from '@clover/public/components/common/page'
import { TitleBar } from '@clover/public/components/common/title-bar'
import { useLayoutConfig } from '@clover/public/components/layout/hooks/use.layout.config'
import { BreadcrumbItem, BreadcrumbPage, Card } from '@easykit/design'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { Password } from './password'

export const SecurityPage = () => {
  const { t } = useTranslation()
  const title = t('安全设置')
  useLayoutConfig<MainLayoutProps>({
    active: 'profile',
  })

  return (
    <Page>
      <ProfileBreadcrumbBase>
        <BreadcrumbItem>
          <BreadcrumbPage>{title}</BreadcrumbPage>
        </BreadcrumbItem>
      </ProfileBreadcrumbBase>
      <TitleBar title={title} />
      <Password />
      <Card title={t('二次验证')}>
        <div className="space-y-2">
          <p>{t('通过第二个登录步骤确保您的帐户更加安全。')}</p>
          <p>
            <Link href="/profile/security/mfa">{t('管理二次验证')}</Link>
          </p>
        </div>
      </Card>
      <Card title={t('访问令牌')}>
        <div className="space-y-2">
          <p>
            {t(
              '脚本或其他进程可以使用访问令牌通过命令行应用或IDE执行基本身份验证。如果进行身份验证的帐户已启用双重验证，则必须使用访问令牌。您应该像保护其他密码一样确保访问令牌的安全。'
            )}
          </p>
          <p>
            <Link href="/profile/security/access/tokens">{t('管理访问令牌')}</Link>
          </p>
        </div>
      </Card>
    </Page>
  )
}
