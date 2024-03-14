import {MenuItemProps} from "@clover/public/components/layout/main/sidebar/menu-item";
import {IconAccess, IconProject, IconSetting, IconUser} from "@arco-iconbox/react-clover";

export const NAV_MENUS: MenuItemProps[] = [
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
];
