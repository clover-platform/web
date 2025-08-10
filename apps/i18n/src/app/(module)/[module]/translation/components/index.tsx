'use client'

import { BreadcrumbItem, BreadcrumbPage, Card } from '@easykit/design'
import { useTranslation } from 'react-i18next'
import { MainPage } from '@clover/public/components/common/page'
import { PageHeader } from '@clover/public/components/common/page/header'
import { TitleBar } from '@clover/public/components/common/title-bar'
import { useLayoutConfig } from '@clover/public/components/layout/hooks/use.layout.config'
import { ModuleBreadcrumb } from '@/components/common/breadcrumb/module'
import type { ModuleLayoutProps } from '@/components/layout/module'

export const TranslationPage = () => {
  const { t } = useTranslation()
  useLayoutConfig<ModuleLayoutProps>({
    active: 'translation',
  })

  const title = t('产物')
  return (
    <MainPage>
      <PageHeader>
        <ModuleBreadcrumb>
          <BreadcrumbItem>
            <BreadcrumbPage>{title}</BreadcrumbPage>
          </BreadcrumbItem>
        </ModuleBreadcrumb>
        <TitleBar title={title} />
      </PageHeader>
      <div className="container">
        <Card>page</Card>
      </div>
    </MainPage>
  )
}
