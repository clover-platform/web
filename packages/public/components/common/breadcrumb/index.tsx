import type { FC, PropsWithChildren } from 'react'
import { IconHome } from '@arco-iconbox/react-clover'
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator } from '@easykit/design'
import Link from 'next/link'

export type PublicAppBreadcrumbProps = PropsWithChildren<{
  homeUrl?: string
}>

export const PublicAppBreadcrumb: FC<PublicAppBreadcrumbProps> = (props) => {
  const { homeUrl = '/' } = props

  return (
    <Breadcrumb>
      <BreadcrumbList className="gap-1 sm:gap-1">
        <BreadcrumbItem className="leading-4">
          <Link href={homeUrl}>
            <IconHome className="size-4" />
          </Link>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {props.children}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
