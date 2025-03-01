import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@easykit/design";
import React from "react";
import {tt} from "@clover/public/locale";
import Link from "next/link";
import {TeamCollect} from "@/components/layout/main/header/team/collect";

export const Team = () => {
  return <DropdownMenuContent className="w-96" align={"start"}>
    <TeamCollect />
    <DropdownMenuSeparator />
    <Link href={"/team"}>
      <DropdownMenuItem>{tt("查看所有团队")}</DropdownMenuItem>
    </Link>
    <Link href={"/team/new"}>
      <DropdownMenuItem>{tt("创建团队")}</DropdownMenuItem>
    </Link>
  </DropdownMenuContent>
}
