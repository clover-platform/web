import {
  Action, Avatar, DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@easykit/design";
import {FC, ReactNode, useState} from "react";
import {ThemeMenu} from "@clover/public/components/layout/main/header/profile-menu/theme-menu";
import {tt} from "@clover/public/locale";
import {AccountInfo} from "@clover/public/components/layout/main/header/profile-menu/account-info";
import Link from "next/link";

export type ProfileMenuProps = {
  extra?: ReactNode;
}

export const ProfileMenu: FC<ProfileMenuProps> = (props) => {
  const { extra } = props;
  const [open, setOpen] = useState(false);

  return <DropdownMenu open={open} onOpenChange={setOpen}>
    <DropdownMenuTrigger asChild>
      <Action className={"!outline-none !rounded-full !p-0.5"} active={open}>
        <Avatar className={"w-7 h-7"} src={"/assets/main/image/default/avatar.png"} alt={"cover"}/>
      </Action>
    </DropdownMenuTrigger>
    <DropdownMenuContent align={"end"} className={"w-64 p-0"}>
      <DropdownMenuLabel className={"text-secondary-foreground/50"}>{tt("账户")}</DropdownMenuLabel>
      <AccountInfo />
      <DropdownMenuSeparator />
      <Link href={"/profile/-"}>
        <DropdownMenuItem>{tt("管理账户")}</DropdownMenuItem>
      </Link>
      <ThemeMenu />
      {extra}
      <DropdownMenuSeparator />
      <DropdownMenuItem>{tt("退出")}</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
}
