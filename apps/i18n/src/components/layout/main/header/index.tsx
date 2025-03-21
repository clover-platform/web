import React, {FC, ReactNode, useMemo, useState} from "react";
import {
  Action,
  DropdownMenu,
  DropdownMenuTrigger,
} from "@easykit/design";
import {tt} from "@clover/public/locale";
import {ChevronDownIcon} from "@radix-ui/react-icons";

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
      component: <div/>
    },
    {
      id: "project",
      title: tt("项目"),
      component: <div />
    },
    {
      id: "profile",
      title: tt("账号"),
      component: <div />
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
      <div onClick={() => setOpen(false)}>
        { config.component }
      </div>
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
