import type { FC, PropsWithChildren } from 'react'
import { PublicAppBreadcrumb } from '@clover/public/components/common/breadcrumb'

export type AppBreadcrumbProps = PropsWithChildren

export const AppBreadcrumb: FC<AppBreadcrumbProps> = (props) => {
  return <PublicAppBreadcrumb>{props.children}</PublicAppBreadcrumb>
}
