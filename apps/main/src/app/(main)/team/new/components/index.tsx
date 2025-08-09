'use client'

import { TeamForm } from '../../components/form'

import { BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator, Card } from '@easykit/design'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { TitleBar } from '@clover/public/components/common/title-bar'
import { useLayoutConfig } from '@clover/public/components/layout/hooks/use.layout.config'
import { AppBreadcrumb } from '@/components/common/app-breadcrumb'
import { MainPage } from '@/components/common/main-page'
import type { MainLayoutProps } from '@/components/layout/main'

export const NewTeamPage = () => {
  useLayoutConfig<MainLayoutProps>({
    active: 'team',
  })
  const { t } = useTranslation()
  const title = t('新建团队')

  return (
    <MainPage>
      <AppBreadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink asChild={true}>
            <Link href="/team">{t('团队')}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{title}</BreadcrumbPage>
        </BreadcrumbItem>
      </AppBreadcrumb>
      <TitleBar title={title} />
      <Card>
        <TeamForm />
      </Card>
    </MainPage>
  )
}
