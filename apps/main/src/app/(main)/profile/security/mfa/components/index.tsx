'use client'

import { ProfileBreadcrumbBase } from '@/components/common/breadcrumb/profile'
import type { MainLayoutProps } from '@/components/layout/main'
import { Page } from '@clover/public/components/common/page'
import { TitleBar } from '@clover/public/components/common/title-bar'
import { useLayoutConfig } from '@clover/public/components/layout/hooks/use.layout.config'
import {
  Badge,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Card,
  Separator,
  Skeleton,
  time,
} from '@easykit/design'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { DisableModal } from './disable-modal'
import { EnableModal } from './enable-modal'
import { otpStatus } from './rest'

export const MFAPage = () => {
  const { t } = useTranslation()
  const title = t('二次验证')
  useLayoutConfig<MainLayoutProps>({
    active: 'profile',
  })
  const client = useQueryClient()
  const { data: result, isLoading } = useQuery({
    queryFn: otpStatus,
    queryKey: ['profile:mfa'],
  })

  const onSuccess = () => client.invalidateQueries({ queryKey: ['profile:mfa'] })

  const statusTitle = (
    <div className="flex items-center justify-start space-x-sm">
      <span>{title}</span>
      {isLoading ? (
        <Skeleton className="h-6 w-16" />
      ) : (
        <Badge variant={result?.enable ? 'default' : 'outline'}>{result?.enable ? t('已启用') : t('未启用')}</Badge>
      )}
    </div>
  )

  return (
    <Page>
      <ProfileBreadcrumbBase>
        <BreadcrumbItem>
          <BreadcrumbLink asChild={true}>
            <Link href="/profile/security">{t('安全设置')}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{title}</BreadcrumbPage>
        </BreadcrumbItem>
      </ProfileBreadcrumbBase>
      <TitleBar title={statusTitle} />
      <Card>
        <div className="space-y-4">
          <div>
            {result?.enable ? (
              <>
                <p>{t('您已通过增加第二个登录步骤确保您的帐户更加安全，起始时间：')}</p>
                <p className="mb-sm font-bold">{time(result?.enableTime)}</p>
              </>
            ) : null}
            <p>
              {t(
                '如果您使用 Google、Microsoft 或 SAML 单一登录进行登录，则不会采用双重验证。我们建议您使用 Google 或身份提供程序的双重验证。'
              )}
            </p>
          </div>
          <Separator />
          {isLoading ? (
            <Skeleton className="h-6 w-28" />
          ) : result?.enable ? (
            <DisableModal onSuccess={onSuccess} />
          ) : (
            <EnableModal onSuccess={onSuccess} />
          )}
        </div>
      </Card>
    </Page>
  )
}
