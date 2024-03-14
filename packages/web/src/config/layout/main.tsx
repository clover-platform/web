import {
    IconProject,
    IconAccess, IconUser, IconSetting,
    IconWiki, IconI18n, IconGantt,
} from "@arco-iconbox/react-clover";
import { MenuItemProps } from "@clover/public/components/layout/main/sidebar/menu-item";

export const NAV_MENUS: MenuItemProps[] = [
    {
        id: "project",
        title: "{#项目#}",
        url: "/{#LANG#}/project/",
        icon: <IconProject />,
    },
    {
        id: "task",
        title: "{#任务#}",
        url: "/{#LANG#}/task/",
        icon: <IconGantt />,
    },
    {
        id: "wiki",
        title: "{#文档#}",
        url: "/{#LANG#}/wiki/",
        icon: <IconWiki />,
    },
    {
        id: "i18n",
        title: "{#国际化#}",
        url: "/{#LANG#}/i18n/",
        icon: <IconI18n />,
    },
    {
        id: "member",
        title: "{#团队成员#}",
        url: "/{#LANG#}/member/",
        icon: <IconUser />,
    },
    {
        id: "access",
        title: "{#权限管理#}",
        url: "/{#LANG#}/access/",
        icon: <IconAccess />,
    },
    {
        id: "setting",
        title: "{#系统设置#}",
        url: "/{#LANG#}/setting/",
        icon: <IconSetting />,
    }
]

