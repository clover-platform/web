import {
    IconActivity, IconBranch,
    IconDashboard, IconDownload,
    IconMember, IconSetting,
} from "@arco-iconbox/react-clover";
import { MenuItemProps } from "@clover/public/components/layout/main/sidebar/menu-item";
import {FIX_ICON_PROPS} from "@easy-kit/common/utils/icon";

const base = "/{#LANG#}/i18n"

export const NAV_MENUS: MenuItemProps[] = [
    {
        id: "dashboard",
        title: "{#概览#}",
        url: `${base}/dashboard/`,
        icon: <IconDashboard {...FIX_ICON_PROPS} />,
    },
    {
        id: "branch",
        title: "{#分支#}",
        url: `${base}/branch/`,
        icon: <IconBranch {...FIX_ICON_PROPS} />,
    },
    {
        id: "download",
        title: "{#下载#}",
        url: `${base}/bundle/`,
        icon: <IconDownload {...FIX_ICON_PROPS} />,
    },
    {
        id: "member",
        title: "{#成员#}",
        url: `${base}/member/`,
        icon: <IconMember {...FIX_ICON_PROPS} />,
    },
    {
        id: "activity",
        title: "{#动态#}",
        url: `${base}/activity/`,
        icon: <IconActivity {...FIX_ICON_PROPS} />,
    },
    {
        id: "setting",
        title: "{#设置#}",
        url: `${base}/setting/`,
        icon: <IconSetting {...FIX_ICON_PROPS} />,
    },
]

