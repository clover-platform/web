import {DropdownMenuContent, DropdownMenuItem} from "@easykit/design";
import React from "react";
import Link from "next/link";
import {useAtomValue} from "jotai/index";
import {accountInfoState} from "@clover/public/state/account";
import { useTranslation } from "react-i18next";
export const Profile = () => {
  const account = useAtomValue(accountInfoState);
  const { t } = useTranslation();

  return <DropdownMenuContent className="w-48" align={"start"}>
    <Link href={`/profile/${account.username}`}>
      <DropdownMenuItem>{t("个人资料")}</DropdownMenuItem>
    </Link>
    <Link href={"/profile/security"}>
      <DropdownMenuItem>{t("安全设置")}</DropdownMenuItem>
    </Link>
  </DropdownMenuContent>
}
