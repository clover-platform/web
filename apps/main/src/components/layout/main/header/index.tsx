import React, {FC} from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@easykit/design";
import {tt} from "@clover/public/locale";

export type HeaderProps = {
  active?: string;
}

export const Header: FC<HeaderProps> = () => {
  return <NavigationMenu>
    <NavigationMenuList>
      <NavigationMenuItem>
        <NavigationMenuTrigger>{tt("团队")}</NavigationMenuTrigger>
        <NavigationMenuContent>
          team
        </NavigationMenuContent>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuTrigger>{tt("项目")}</NavigationMenuTrigger>
        <NavigationMenuContent>
          project
        </NavigationMenuContent>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
}
