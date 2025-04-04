import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator
} from "@easykit/design";
import Link from "next/link";
import {tt} from "@clover/public/locale";
import {FC, PropsWithChildren} from "react";
import {useAtomValue} from "jotai/index";
import {accountInfoState} from "@clover/public/state/account";
import {AppBreadcrumb} from "@/components/common/app-breadcrumb";

export type BreadcrumbBase = PropsWithChildren;

export const ProfileBreadcrumbBase: FC<BreadcrumbBase> = (props) => {
  const account = useAtomValue(accountInfoState);

  return <AppBreadcrumb>
    <BreadcrumbItem>
      <BreadcrumbLink asChild={true}>
        <Link href={`/profile/${account.username}`}>{tt("个人资料")}</Link>
      </BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    { props.children }
  </AppBreadcrumb>
}
