'use client'

import ModuleForm from './form'

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
import { MainPage } from '@clover/public/components/common/page'
import { PageHeader } from '@clover/public/components/common/page/header'
import { TitleBar } from '@clover/public/components/common/title-bar'
import { useLayoutConfig } from '@clover/public/components/layout/hooks/use.layout.config'
import { AppBreadcrumb } from '@/components/common/breadcrumb/app'
import type { MainLayoutProps } from '@/components/layout/main'
import type { ModuleFormData } from '@/config/schema/module'
import { create } from '@/rest/module'

export const CreateModulePage = () => {
  const { t } = useTranslation()
  useLayoutConfig<MainLayoutProps>({
    active: 'module',
  })
  const msg = useMessage()
  const router = useRouter()
  const queryClient = useQueryClient()
  const { mutate: createModule, isPending } = useMutation({
    mutationFn: create,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['module:list'] })
      router.push('/')
    },
    onError: (error) => {
      msg.error(error.message)
    },
  })

  const onSubmit = (data: ModuleFormData) => {
    createModule(data)
  }

  return (
    <MainPage>
      <PageHeader>
        <AppBreadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink asChild={true}>
              <Link href="/">{t('模块')}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{t('创建模块')}</BreadcrumbPage>
          </BreadcrumbItem>
        </AppBreadcrumb>
        <TitleBar title={t('创建模块')} />
      </PageHeader>
      <div className="container">
        <Card>
          <ModuleForm onSubmit={onSubmit}>
            <Space>
              <Button loading={isPending} type="submit">
                {t('提交')}
              </Button>
              <BackButton />
            </Space>
          </ModuleForm>
        </Card>
      </div>
    </MainPage>
  )
}
