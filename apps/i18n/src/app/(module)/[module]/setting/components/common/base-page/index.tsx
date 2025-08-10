import { SettingTabsTitle } from '../tabs-title'

import type { FC, PropsWithChildren } from 'react'
import { BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator, Card } from '@easykit/design'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { MainPage } from '@clover/public/components/common/page'
import { PageHeader } from '@clover/public/components/common/page/header'
import { TitleBar } from '@clover/public/components/common/title-bar'
import { ModuleBreadcrumb } from '@/components/common/breadcrumb/module'
import { useModule } from '@/hooks/use.module'

export type SettingBasePageProps = PropsWithChildren<{
  title: string
  active: string
}>

export const SettingBasePage: FC<SettingBasePageProps> = (props) => {
  const { title, active } = props
  const m = useModule()
  const { t } = useTranslation()

  return (
    <MainPage>
      <PageHeader>
        <ModuleBreadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink asChild={true}>
              <Link href={`/${m}/setting`}>{t('设置')}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{title}</BreadcrumbPage>
          </BreadcrumbItem>
        </ModuleBreadcrumb>
        <TitleBar border={false} title={title} />
        <SettingTabsTitle active={active} />
      </PageHeader>
      <div className="container">
        <Card contentClassName="gap-2 flex flex-col">{props.children}</Card>
      </div>
    </MainPage>
  )
}
