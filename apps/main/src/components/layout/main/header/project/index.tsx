import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@easykit/design";
import React from "react";
import {tt} from "@clover/public/locale";
import Link from "next/link";
import {ProjectCollect} from "@/components/layout/main/header/project/collect";

export const Project = () => {
  return <DropdownMenuContent className="w-96" align={"start"}>
    <ProjectCollect />
    <DropdownMenuSeparator />
    <Link href={"/project"}>
      <DropdownMenuItem>{tt("查看所有项目")}</DropdownMenuItem>
    </Link>
    <Link href={"/project/new"}>
      <DropdownMenuItem>{tt("创建项目")}</DropdownMenuItem>
    </Link>
  </DropdownMenuContent>
}
