import {
    IconActivity, IconBranch,
    IconDashboard, IconDownload,
    IconI18n, IconMember, IconSetting, IconSource, IconTranslation,
} from "@arco-iconbox/react-clover";
import { MenuItemProps } from "@clover/public/components/layout/main/sidebar/menu-item";

const base = "/{#LANG#}/i18n/module"

export const NAV_MENUS: MenuItemProps[] = [
    {
        id: "dashboard",
        title: "{#概览#}",
        url: `${base}/dashboard/`,
        icon: <IconDashboard />,
    },
    {
        id: "branch",
        title: "{#分支#}",
        url: `${base}/branch/`,
        icon: <IconBranch />,
    },
    {
        id: "download",
        title: "{#下载#}",
        url: `${base}/download/`,
        icon: <IconDownload />,
    },
    {
        id: "member",
        title: "{#成员#}",
        url: `${base}/member/`,
        icon: <IconMember />,
    },
    {
        id: "activity",
        title: "{#动态#}",
        url: `${base}/activity/`,
        icon: <IconActivity />,
    },
    {
        id: "setting",
        title: "{#设置#}",
        url: `${base}/setting/`,
        icon: <IconSetting />,
    },
]

