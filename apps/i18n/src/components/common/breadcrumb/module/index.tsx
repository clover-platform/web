import { useModuleInfo } from '@/hooks/use.module.info'
import { BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, Skeleton } from '@easykit/design'
import Link from 'next/link'
import type { FC, PropsWithChildren } from 'react'
import { useTranslation } from 'react-i18next'
import { AppBreadcrumb } from '../app'

export type ModuleBreadcrumbProps = PropsWithChildren

export const ModuleBreadcrumb: FC<ModuleBreadcrumbProps> = (props) => {
  const { t } = useTranslation()
  const [baseInfo] = useModuleInfo()
  return (
    <AppBreadcrumb>
      <BreadcrumbItem>
        <BreadcrumbLink asChild={true}>
          <Link href="/">{t('模块')}</Link>
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        {baseInfo?.identifier ? (
          <BreadcrumbLink asChild={true}>
            <Link href={`/${baseInfo?.identifier}/dashboard`}>{baseInfo?.name}</Link>
          </BreadcrumbLink>
        ) : (
          <Skeleton className="h-5 w-20 bg-black/8 dark:bg-white/10" />
        )}
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      {props.children}
    </AppBreadcrumb>
  )
}
