import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@easykit/design";
import React from "react";
import {t} from "@clover/public/utils/i18next";
import Link from "next/link";
import {TeamCollect} from "@/components/layout/main/header/team/collect";

export const Team = () => {
  return <DropdownMenuContent className="w-96" align={"start"}>
    <TeamCollect />
    <DropdownMenuSeparator />
    <Link href={"/team"}>
      <DropdownMenuItem>{t("查看所有团队")}</DropdownMenuItem>
    </Link>
    <Link href={"/team/new"}>
      <DropdownMenuItem>{t("创建团队")}</DropdownMenuItem>
    </Link>
  </DropdownMenuContent>
}
