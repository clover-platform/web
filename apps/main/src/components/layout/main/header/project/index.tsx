import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@easykit/design";
import React from "react";
import {t} from "@clover/public/utils/i18next";
import Link from "next/link";
import {ProjectCollect} from "@/components/layout/main/header/project/collect";

export const Project = () => {
  return <DropdownMenuContent className="w-96" align={"start"}>
    <ProjectCollect />
    <DropdownMenuSeparator />
    <Link href={"/project"}>
      <DropdownMenuItem>{t("查看所有项目")}</DropdownMenuItem>
    </Link>
    <Link href={"/project/new"}>
      <DropdownMenuItem>{t("创建项目")}</DropdownMenuItem>
    </Link>
  </DropdownMenuContent>
}
