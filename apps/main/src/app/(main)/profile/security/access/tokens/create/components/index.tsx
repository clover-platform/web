'use client'

import { AccessTokenForm } from './form'
import { TokenDisplay } from './token-display'

import { useState } from 'react'
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  Card,
  Space,
  useMessage,
} from '@easykit/design'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import BackButton from '@clover/public/components/common/button/back'
import { TitleBar } from '@clover/public/components/common/title-bar'
import { useLayoutConfig } from '@clover/public/components/layout/hooks/use.layout.config'
import { ProfileBreadcrumbBase } from '@/components/common/breadcrumb/profile'
import { MainPage } from '@/components/common/main-page'
import type { MainLayoutProps } from '@/components/layout/main'
import { create } from '@/rest/profile/security/access/tokens'

export const AccessTokensCreatePage = () => {
  useLayoutConfig<MainLayoutProps>({
    active: 'profile',
  })
  const { t } = useTranslation()
  const title = t('创建访问令牌')
  const [token, setToken] = useState<string>()
  const router = useRouter()
  const msg = useMessage()
  const queryClient = useQueryClient()
  const { mutate: createToken, isPending: creating } = useMutation({
    mutationFn: create,
    onSuccess: (data) => {
      setToken(data)
      queryClient.invalidateQueries({ queryKey: ['profile:access:tokens'], exact: false })
    },
    onError: (error) => {
      msg.error(error.message)
    },
  })

  return (
    <MainPage>
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
          <AccessTokenForm onSubmit={createToken}>
            <Space>
              <Button loading={creating} type="submit">
                {t('提交')}
              </Button>
              <BackButton />
            </Space>
          </AccessTokenForm>
        )}
      </Card>
    </MainPage>
  )
}
