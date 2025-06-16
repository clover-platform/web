'use client'

import { ModuleBreadcrumb } from '@/components/common/breadcrumb/module'
import type { ModuleLayoutProps } from '@/components/layout/module'
import type { BundleFormData } from '@/config/schema/module/bundle'
import { useModule } from '@/hooks/use.module'
import { create } from '@/rest/bundle'
import BackButton from '@clover/public/components/common/button/back'
import { MainPage } from '@clover/public/components/common/page'
import { TitleBar } from '@clover/public/components/common/title-bar'
import { useLayoutConfig } from '@clover/public/components/layout/hooks/use.layout.config'
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
import { BundleForm } from './form'

export const AddBundlePage = () => {
  const m = useModule()
  useLayoutConfig<ModuleLayoutProps>({
    active: 'bundle',
  })
  const { t } = useTranslation()
  const msg = useMessage()
  const router = useRouter()
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: create,
    onSuccess: () => {
      router.push(`/${m}/bundle`)
      queryClient.invalidateQueries({ queryKey: ['module:bundle', { module: m }] })
    },
    onError: (error) => {
      msg.error(error.message)
    },
  })

  const onSubmit = (data: BundleFormData) => {
    mutate({
      ...data,
      module: m,
    })
  }

  const title = t('添加产物')

  return (
    <MainPage>
      <ModuleBreadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink asChild={true}>
            <Link href={`/${m}/bundle`}>{t('产物')}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{title}</BreadcrumbPage>
        </BreadcrumbItem>
      </ModuleBreadcrumb>
      <TitleBar title={title} />
      <Card>
        <BundleForm onSubmit={onSubmit}>
          <Space>
            <Button loading={isPending} type="submit">
              {t('提交')}
            </Button>
            <BackButton />
          </Space>
        </BundleForm>
      </Card>
    </MainPage>
  )
}
