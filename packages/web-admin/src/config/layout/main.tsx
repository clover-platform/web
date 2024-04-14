import {MenuItemProps} from "@clover/public/components/layout/main/sidebar/menu-item";
import {IconAccess, IconSetting, IconUser} from "@arco-iconbox/react-clover";

export const NAV_MENUS: MenuItemProps[] = [
    {
        id: "overview",
        title: "{#概览#}",
        icon: <IconUser />,
        children: [
            {
                id: "overview.dashboard",
                title: "{#仪表盘#}",
                url: "/{#LANG#}/admin/dashboard/",
            },
            {
                id: "overview.team",
                title: "{#团队#}",
                url: "/{#LANG#}/admin/team/",
            },
            {
                id: "overview.project",
                title: "{#项目#}",
                url: "/{#LANG#}/admin/project/",
            },
            {
                id: "overview.user",
                title: "{#用户#}",
                url: "/{#LANG#}/admin/user/",
            },
        ]
    },
    {
        id: "access",
        title: "{#权限#}",
        icon: <IconAccess />,
        children: [
            {
                id: "access.role",
                title: "{#角色管理#}",
                url: "/{#LANG#}/admin/access/role/",
            },
            {
                id: "access.authority",
                title: "{#资源管理#}",
                url: "/{#LANG#}/admin/access/authority/",
            },
        ]
    },
    {
        id: "setting",
        title: "{#设置#}",
        url: "/{#LANG#}/setting/",
        icon: <IconSetting />,
    }
];
