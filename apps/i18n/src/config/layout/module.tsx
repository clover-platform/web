import {
    IconActivity, IconBranch,
    IconDashboard, IconDownload,
    IconMember, IconSetting,
} from "@arco-iconbox/react-clover";
import { MenuItemProps } from "@clover/public/components/layout/main/sidebar/menu-item";
import { t } from '@easykit/common/utils/locale';

const base = "/{#LANG#}/i18n"

export const NAV_MENUS: MenuItemProps[] = [
    {
        id: "dashboard",
        title: t("概览"),
        url: `${base}/dashboard/`,
        icon: <IconDashboard />,
    },
    {
        id: "branch",
        title: t("分支"),
        url: `${base}/branch/`,
        icon: <IconBranch />,
    },
    {
        id: "download",
        title: t("下载"),
        url: `${base}/bundle/`,
        icon: <IconDownload />,
    },
    {
        id: "member",
        title: t("成员"),
        url: `${base}/member/`,
        icon: <IconMember />,
    },
    {
        id: "activity",
        title: t("动态"),
        url: `${base}/activity/`,
        icon: <IconActivity />,
    },
    {
        id: "setting",
        title: t("设置"),
        url: `${base}/setting/`,
        icon: <IconSetting />,
    },
]

