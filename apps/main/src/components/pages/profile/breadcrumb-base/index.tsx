import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from "@easykit/design";
import Link from "next/link";
import {tt} from "@clover/public/locale";
import {FC, PropsWithChildren} from "react";

export type BreadcrumbBase = PropsWithChildren;

export const ProfileBreadcrumbBase: FC<BreadcrumbBase> = (props) => {
  return <Breadcrumb>
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink asChild={true}>
          <Link href="/dashboard">{tt("控制台")}</Link>
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink asChild={true}>
          <Link href="/profile">{tt("个人资料")}</Link>
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      { props.children }
    </BreadcrumbList>
  </Breadcrumb>
}
