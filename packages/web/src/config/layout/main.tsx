import { MenuItemProps } from "@clover/common/components/layout/admin/sidebar";
import {
    IconHome, IconProject, IconTodo,
    IconAccess, IconUser, IconHelp, IconNew
} from "@arco-iconbox/react-clover";
import { DropdownMenuItem } from "@clover/core";

export const NAV_MENUS: MenuItemProps[] = [
    {
        id: "home",
        title: "{#首页#}",
        url: "/{#LANG#}/",
        active: true,
        icon: <IconHome />
    },
    {
        id: "project",
        title: "{#项目管理#}",
        url: "/{#LANG#}/project/",
        icon: <IconProject />
    },
    {
        id: "todo",
        title: "{#待办事项#}",
        url: "/{#LANG#}/todo/",
        icon: <IconTodo />
    },
    {
        id: "user",
        title: "{#用户管理#}",
        url: "/{#LANG#}/user/",
        icon: <IconUser />
    },
    {
        id: "access",
        title: "{#权限管理#}",
        url: "/{#LANG#}/access/",
        icon: <IconAccess />
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

export const PROFILE_MENUS: DropdownMenuItem[] = [
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
        label: "{#Profile#}",
        shortcut: "⇧⌘P"
    },
    {
        id: "billing",
        type: "item",
        label: "{#Billing#}",
        shortcut: "⌘B",
        children: [
            {
                id: "email",
                type: "item",
                label: "{#Email#}",
            },
            {
                id: "message",
                type: "item",
                label: "{#Message#}",
            },
        ]
    },
    {
        type: "separator",
        id: 'separator.2'
    },
    {
        id: 'log.out',
        type: "item",
        label: "{#Log out#}"
    },
]
