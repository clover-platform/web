import { IconHome } from '@arco-iconbox/react-clover'
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator } from '@easykit/design'
import Link from 'next/link'
import type { FC, PropsWithChildren } from 'react'

export type PublicAppBreadcrumbProps = PropsWithChildren<{
  homeUrl?: string
}>

export const PublicAppBreadcrumb: FC<PublicAppBreadcrumbProps> = (props) => {
  const { homeUrl = '/' } = props

  return (
    <Breadcrumb>
      <BreadcrumbList>
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
