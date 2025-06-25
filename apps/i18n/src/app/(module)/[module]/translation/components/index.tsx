'use client'

import { ModuleBreadcrumb } from '@/components/common/breadcrumb/module'
import type { ModuleLayoutProps } from '@/components/layout/module'
import { MainPage } from '@clover/public/components/common/page'
import { TitleBar } from '@clover/public/components/common/title-bar'
import { useLayoutConfig } from '@clover/public/components/layout/hooks/use.layout.config'
import { BreadcrumbItem, BreadcrumbPage, Card } from '@easykit/design'
import { useTranslation } from 'react-i18next'

export const TranslationPage = () => {
  const { t } = useTranslation()
  useLayoutConfig<ModuleLayoutProps>({
    active: 'translation',
  })

  const title = t('产物')
  return (
    <MainPage>
      <ModuleBreadcrumb>
        <BreadcrumbItem>
          <BreadcrumbPage>{title}</BreadcrumbPage>
        </BreadcrumbItem>
      </ModuleBreadcrumb>
      <TitleBar title={title} />
      <Card>page</Card>
    </MainPage>
  )
}