import {PublicAppBreadcrumb} from "@clover/public/components/common/breadcrumb";
import type { FC, PropsWithChildren } from 'react'

export type AppBreadcrumbProps = PropsWithChildren;

export const AppBreadcrumb: FC<AppBreadcrumbProps> = (props) => {
  return <PublicAppBreadcrumb>{props.children}</PublicAppBreadcrumb> 
}
