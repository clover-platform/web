import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator, Empty,
} from "@easykit/design";
import React from "react";
import {tt} from "@clover/public/locale";
import Link from "next/link";

export const Project = () => {
  return <DropdownMenuContent className="w-64" align={"start"}>
    <div>
      <Empty text={tt("你关注的项目在此处显示")}/>
    </div>
    <DropdownMenuSeparator />
    <Link href={"/project"}>
      <DropdownMenuItem>{tt("查看所有项目")}</DropdownMenuItem>
    </Link>
    <Link href={"/project/new"}>
      <DropdownMenuItem>{tt("创建项目")}</DropdownMenuItem>
    </Link>
  </DropdownMenuContent>
}
