import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator, Empty,
} from "@easykit/design";
import React from "react";
import {tt} from "@clover/public/locale";
import Link from "next/link";

export const Team = () => {
  return <DropdownMenuContent className="w-64" align={"start"}>
    <div>
      <Empty text={tt("你关注的团队在此处显示")}/>
    </div>
    <DropdownMenuSeparator />
    <Link href={"/team"}>
      <DropdownMenuItem>{tt("查看所有团队")}</DropdownMenuItem>
    </Link>
    <Link href={"/team/new"}>
      <DropdownMenuItem>{tt("创建团队")}</DropdownMenuItem>
    </Link>
  </DropdownMenuContent>
}
