'use client'

import { getColumns, getRowActions } from '../config/token'

import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  Card,
  DataTable,
  useAlert,
  useMessage,
} from '@easykit/design'
import { useMutation } from '@tanstack/react-query'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { PageHeader } from '@clover/public/components/common/page/header'
import { TitleBar } from '@clover/public/components/common/title-bar'
import { useLayoutConfig } from '@clover/public/components/layout/hooks/use.layout.config'
import { useListQuery } from '@clover/public/hooks'
import { ProfileBreadcrumbBase } from '@/components/common/breadcrumb/profile'
import { MainPage } from '@/components/common/main-page'
import type { MainLayoutProps } from '@/components/layout/main'
import { type ListParams, list, revoke } from '@/rest/profile/security/access/tokens'
import type { AccessToken } from '@/types/profile/access/token'

export const AccessTokensPage = () => {
  useLayoutConfig<MainLayoutProps>({
    active: 'profile',
  })
  const { t } = useTranslation()
  const title = t('访问令牌')
  const alert = useAlert()
  const msg = useMessage()
  const { loading, data, load, pagination, refetch } = useListQuery<AccessToken, ListParams>({
    key: 'profile:access:tokens',
    action: list,
  })
  const { mutate: revokeToken, isPending: revoking } = useMutation({
    mutationFn: revoke,
    onSuccess: () => {
      refetch()
    },
    onError: (error) => {
      msg.error(error.message)
    },
  })

  const actions = (
    <div className="space-x-2">
      <Link href="/profile/security/access/tokens/create">
        <Button>{t('创建')}</Button>
      </Link>
    </div>
  )

  return (
    <MainPage>
      <PageHeader>
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
        <TitleBar actions={actions} title={title} />
      </PageHeader>
      <div className="container">
        <Card>
          <DataTable<AccessToken>
            columns={getColumns()}
            data={data}
            inCard={true}
            load={load}
            loading={loading || revoking}
            onRowActionClick={({ id: key }, { original }) => {
              const { id } = original
              if (key === 'revoke') {
                alert.confirm({
                  title: t('撤销令牌'),
                  description: t('撤销后将无法再使用该令牌，且该操作无法恢复。'),
                  onOk: () => revokeToken(id),
                })
              }
            }}
            pagination={pagination}
            rowActions={(row) => getRowActions(row)}
          />
        </Card>
      </div>
    </MainPage>
  )
}
