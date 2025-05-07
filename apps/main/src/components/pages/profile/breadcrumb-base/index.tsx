import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator
} from "@easykit/design";
import Link from "next/link";
import {FC, PropsWithChildren} from "react";
import {useAtomValue} from "jotai/index";
import {accountInfoState} from "@clover/public/state/account";
import {AppBreadcrumb} from "@/components/common/app-breadcrumb";
import { useTranslation } from 'react-i18next';

export type BreadcrumbBase = PropsWithChildren;

export const ProfileBreadcrumbBase: FC<BreadcrumbBase> = (props) => {
  const account = useAtomValue(accountInfoState);
  const { t } = useTranslation();

  return <AppBreadcrumb>
    <BreadcrumbItem>
      <BreadcrumbLink asChild={true}>
        <Link href={`/profile/${account.username}`}>{t("个人资料")}</Link>
      </BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    { props.children }
  </AppBreadcrumb>
}
