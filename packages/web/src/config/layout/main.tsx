import { MenuItemProps } from "@easy-kit/common/components/layout/admin/sidebar";
import {
    IconHome, IconProject, IconTodo,
    IconAccess, IconUser, IconHelp, IconNew, IconSetting, IconWiki, IconI18n
} from "@arco-iconbox/react-clover";
import {DropdownMenuItemProps} from "@atom-ui/core";

export type MenuItemWithPerm = {
    perm?: string | string[];
} & MenuItemProps;

export type DropdownMenuItemWithPerm = {
    perm?: string | string[];
} & DropdownMenuItemProps;

export const NAV_MENUS: MenuItemWithPerm[] = [
    {
        id: "home",
        title: "{#首页#}",
        url: "/{#LANG#}/",
        active: true,
        icon: <IconHome />,
        perm: "menu:home"
    },
    {
        id: "project",
        title: "{#项目#}",
        url: "/{#LANG#}/project/",
        icon: <IconProject />,
        perm: "menu:project"
    },
    {
        id: "todo",
        title: "{#待办事项#}",
        url: "/{#LANG#}/todo/",
        icon: <IconTodo />,
        perm: "menu:todo"
    },
    {
        id: "wiki",
        title: "{#文档#}",
        url: "/{#LANG#}/wiki/",
        active: true,
        icon: <IconWiki />,
        perm: "menu:wiki"
    },
    {
        id: "i18n",
        title: "{#国际化#}",
        url: "/{#LANG#}/i18n/",
        active: true,
        icon: <IconI18n />,
        perm: "menu:i18n"
    },
    {
        id: "user",
        title: "{#用户管理#}",
        url: "/{#LANG#}/user/",
        icon: <IconUser />,
        perm: "menu:user"
    },
    {
        id: "access",
        title: "{#权限管理#}",
        url: "/{#LANG#}/access/",
        icon: <IconAccess />,
        perm: "menu:access"
    },
    {
        id: "setting",
        title: "{#系统设置#}",
        url: "/{#LANG#}/setting/",
        icon: <IconSetting />,
        perm: "menu:setting"
    }
]

export const FOOTER_MENUS: MenuItemProps[] = [
    {
        id: "news",
        title: "{#更新内容#}",
        url: "https://www.baidu.com/",
        icon: <IconNew />,
        external: true,
        target: "_blank"
    },
    {
        id: "help",
        title: "{#帮助中心#}",
        url: "https://www.baidu.com/",
        icon: <IconHelp />,
        external: true,
        target: "_blank"
    },
]

export const PROFILE_MENUS: DropdownMenuItemWithPerm[] = [
    {
        id: "my.account",
        type: "label",
        label: "{#我的账户#}"
    },
    {
        type: "separator",
        id: 'separator.1'
    },
    {
        id: "profile",
        type: "item",
        label: "{#账号信息#}",
        perm: "module:setting:profile"
    },
    {
        id: "password",
        type: "item",
        label: "{#修改密码#}",
        perm: "module:setting:password"
    },
    {
        type: "separator",
        id: 'separator.2',
        perm: ["module:setting:profile", "module:setting:password"]
    },
    {
        id: 'logout',
        type: "item",
        label: "{#退出#}"
    },
]

export const ADD_MENUS: DropdownMenuItemWithPerm[] = [
    {
        id: "project",
        type: "item",
        label: "{#新建项目#}",
        perm: "module:project:add"
    },
    {
        id: "user",
        type: "item",
        label: "{#新建用户#}",
        perm: "module:user:add"
    },
]

