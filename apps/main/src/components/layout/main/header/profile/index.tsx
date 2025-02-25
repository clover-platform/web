import {DropdownMenuContent, DropdownMenuItem} from "@easykit/design";
import React from "react";
import {tt} from "@clover/public/locale";
import Link from "next/link";

export const Profile = () => {
  return <DropdownMenuContent className="w-48" align={"start"}>
    <Link href={"/profile"}>
      <DropdownMenuItem>{tt("个人资料")}</DropdownMenuItem>
    </Link>
    <Link href={"/profile/security"}>
      <DropdownMenuItem>{tt("安全设置")}</DropdownMenuItem>
    </Link>
  </DropdownMenuContent>
}
