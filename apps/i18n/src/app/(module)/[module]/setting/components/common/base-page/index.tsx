import { ModuleBreadcrumb } from '@/components/common/breadcrumb/module'
import { useModule } from '@/hooks/use.module'
import { MainPage } from '@clover/public/components/common/page'
import { TitleBar } from '@clover/public/components/common/title-bar'
import { BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator, Card } from '@easykit/design'
import Link from 'next/link'
import type { FC, PropsWithChildren } from 'react'
import { useTranslation } from 'react-i18next'
import { SettingTabsTitle } from '../tabs-title'

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
      <TitleBar title={title} border={false} />
      <Card contentClassName="gap-2 flex flex-col">
        <SettingTabsTitle active={active} />
        {props.children}
      </Card>
    </MainPage>
  )
}