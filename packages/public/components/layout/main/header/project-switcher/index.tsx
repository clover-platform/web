import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@easykit/design";
import Link from "next/link";
import {tt} from "@clover/public/locale";
import React, {useState} from "react";
import {ChevronDownIcon} from "@radix-ui/react-icons";
import {useCurrentProject} from "@clover/public/components/layout/hooks/main";
import {ProjectList} from "@clover/public/components/layout/main/header/project-switcher/list";

export const ProjectSwitcher = () => {
  const [open, setOpen] = useState(false);
  const project = useCurrentProject()

  return <DropdownMenu open={open} onOpenChange={setOpen}>
    <DropdownMenuTrigger asChild>
      <button className={"flex justify-center items-center space-x-1 outline-none"}>
        <span className={"text-secondary-foreground/70"}>@{project?.name}</span>
        <ChevronDownIcon className={open ? "rotate-180" : ""} />
      </button>
    </DropdownMenuTrigger>
    <DropdownMenuContent onClick={() => setOpen(false)} className="w-96" align={"end"}>
      <ProjectList />
      <DropdownMenuSeparator />
      <Link href={"/project"}>
        <DropdownMenuItem>{tt("查看所有项目")}</DropdownMenuItem>
      </Link>
      <Link href={"/project/new"}>
        <DropdownMenuItem>{tt("创建项目")}</DropdownMenuItem>
      </Link>
    </DropdownMenuContent>
  </DropdownMenu>
}
