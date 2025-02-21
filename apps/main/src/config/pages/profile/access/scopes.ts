import {t} from "@clover/public/locale";

export type Scope = {
  key: string;
  description: string;
}

export const getScopes = (): Scope[] => [
  {
    key: "i18n_read",
    description: t("读取国际化数据，可以读取模块信息、分支信息、条目信息等")
  },
  {
    key: "i18n_write",
    description: t("编辑国际化数据。")
  },
  {
    key: "sudo",
    description: t("当以管理员用户身份进行身份验证时，授予作为系统中任何用户执行 API 操作的权限。")
  }
]
