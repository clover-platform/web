'use client';

import {useLayoutConfig} from "@clover/public/components/layout/hooks/use.layout.config";
import {TitleBar} from "@clover/public/components/common/title-bar";
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  Card,
  DataTable,
  useAlert,
  useMessage
} from "@easykit/design";
import {useTableLoader} from "@clover/public/hooks";
import {useEffect} from "react";
import {AccessToken} from "@/types/profile/access/token";
import {list, revoke} from "@/rest/profile/access/token";
import {getColumns, getRowActions} from "@/config/pages/profile/access/token";
import Link from "next/link";
import {MainLayoutProps} from "@/components/layout/main";
import {Page} from "@clover/public/components/common/page";
import {ProfileBreadcrumbBase} from "@/components/pages/profile/breadcrumb-base";
import { useTranslation } from 'react-i18next';
const initialParams = {};

export const AccessTokensPage = () => {
  useLayoutConfig<MainLayoutProps>({
    active: "profile",
  })
  const { t } = useTranslation();
  const title = t("访问令牌");

  const [loading, result, query, load] = useTableLoader<AccessToken>({
    initialParams,
    action: list,
    keys: ['type'],
  });
  const alert = useAlert();
  const msg = useMessage();

  useEffect(() => {
    load().then();
  }, [load]);

  const actions = <div className={"space-x-2"}>
    <Link href={"/profile/security/access/tokens/create"}>
      <Button>{t("创建")}</Button>
    </Link>
  </div>;

  return <Page>
    <ProfileBreadcrumbBase>
      <BreadcrumbItem>
        <BreadcrumbLink asChild={true}>
          <Link href="/profile/security">{t("安全设置")}</Link>
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbPage>{title}</BreadcrumbPage>
      </BreadcrumbItem>
    </ProfileBreadcrumbBase>
    <TitleBar
      title={title}
      actions={actions}
    />
    <Card>
      <DataTable<AccessToken>
        inCard={true}
        load={load}
        pagination={{
          total: result?.total || 0,
          page: query.page,
          size: query.size,
        }}
        columns={getColumns()}
        rowActions={(row) => getRowActions(row)}
        data={result?.data || []}
        loading={loading}
        onRowActionClick={({id: key}, {original}) => {
          const {id} = original;
          if ("revoke" === key) {
            alert.confirm({
              title: t("撤销令牌"),
              description: t("撤销后将无法再使用该令牌，且该操作无法恢复。"),
              onOk: async () => {
                const {success, message} = await revoke(id);
                if (success) {
                  load().then();
                } else {
                  msg.error(message);
                }
                return success;
              }
            });
          }
        }}
      />
    </Card>
  </Page>
}
