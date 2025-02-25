import React, {FC, ReactNode, useMemo, useState} from "react";
import {
  Action,
  DropdownMenu,
  DropdownMenuTrigger,
} from "@easykit/design";
import {tt} from "@clover/public/locale";
import {ChevronDownIcon} from "@radix-ui/react-icons";
import {Team} from "@/components/layout/main/header/team";
import {Profile} from "@/components/layout/main/header/profile";
import {Project} from "@/components/layout/main/header/project";

export type HeaderProps = {
  active?: string;
}

export type NavItemConfig = {
  id: string;
  title: string;
  component?: ReactNode;
  href?: string;
}

export const getNavs = ():NavItemConfig[]  => {
  return [
    {
      id: "team",
      title: tt("团队"),
      component: <Team />
    },
    {
      id: "project",
      title: tt("项目"),
      component: <Project />
    },
    {
      id: "profile",
      title: tt("账号"),
      component: <Profile />
    }
  ]
}

export type NavItemProps = {
  config: NavItemConfig;
  active?: string;
}

export const NavItem: FC<NavItemProps> = (props) => {
  const { config, active } = props;
  const [open, setOpen] = useState(false);
  return <li>
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Action className={"!py-1 space-x-1 !outline-none"} active={config.id === active}>
          <span>{config.title}</span>
          <ChevronDownIcon className={open ? "rotate-180" : ""} />
        </Action>
      </DropdownMenuTrigger>
      { config.component }
    </DropdownMenu>
  </li>
}

export const Header: FC<HeaderProps> = (props) => {
  const { active } = props;
  const items = useMemo(() => {
    return getNavs().map((value) => <NavItem key={value.id} config={value} active={active}/>);
  }, [active])
  return <ul className={"flex space-x-2"}>
    { items }
  </ul>
}
