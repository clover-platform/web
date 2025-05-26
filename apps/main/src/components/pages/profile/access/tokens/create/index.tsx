'use client';

import type { MainLayoutProps } from '@/components/layout/main'
import { AccessTokenForm } from '@/components/pages/profile/access/tokens/create/form'
import { TokenDisplay } from '@/components/pages/profile/access/tokens/create/token-display'
import { ProfileBreadcrumbBase } from '@/components/pages/profile/breadcrumb-base'
import { type CreateData, create } from '@/rest/profile/access/token'
import BackButton from '@clover/public/components/common/button/back'
import { Page } from '@clover/public/components/common/page'
import { TitleBar } from '@clover/public/components/common/title-bar'
import { useLayoutConfig } from '@clover/public/components/layout/hooks/use.layout.config'
import type { FormResult } from '@clover/public/hooks/use.form.result'
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  Card,
  Space,
} from '@easykit/design'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'

export const AccessTokensCreatePage = () => {
  useLayoutConfig<MainLayoutProps>({
    active: 'profile',
  })
  const { t } = useTranslation()
  const title = t('创建访问令牌')

  const [loading, setLoading] = useState(false)
  const [token, setToken] = useState<string>()
  const router = useRouter()

  const onSubmit = useCallback(async (data: CreateData, result: FormResult<string>) => {
    setLoading(true)
    result(await create(data))
    setLoading(false)
  }, [])

  const onSuccess = useCallback((token?: string) => {
    setToken(token)
  }, [])

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
          <BreadcrumbLink asChild={true}>
            <Link href="/profile/security/access/tokens">{t('访问令牌')}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{title}</BreadcrumbPage>
        </BreadcrumbItem>
      </ProfileBreadcrumbBase>
      <TitleBar title={title} />
      <Card>
        {token ? (
          <div className="space-y-2">
            <TokenDisplay token={token} />
            <Space>
              <Button onClick={() => router.push('/profile/security/access/tokens')}>{t('确定')}</Button>
            </Space>
          </div>
        ) : (
          <AccessTokenForm onSuccess={onSuccess} onSubmit={onSubmit}>
            <Space>
              <Button loading={loading} type="submit">
                {t('提交')}
              </Button>
              <BackButton />
            </Space>
          </AccessTokenForm>
        )}
      </Card>
    </Page>
  )
}
