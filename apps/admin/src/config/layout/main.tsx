import {MenuItemProps} from "@clover/public/components/layout/main/sidebar/menu-item";
import {IconAccess, IconSetting, IconUser} from "@arco-iconbox/react-clover";
import { t } from '@easykit/common/utils/locale';

export const getNavMenus = (): MenuItemProps[] => [
    {
        id: "overview",
        title: t("概览"),
        icon: <IconUser />,
        children: [
            {
                id: "overview.dashboard",
                title: t("仪表盘"),
                url: "/admin/dashboard",
            },
            {
                id: "overview.team",
                title: t("团队"),
                url: "/admin/team",
            },
            {
                id: "overview.project",
                title: t("项目"),
                url: "/admin/project",
            },
            {
                id: "overview.user",
                title: t("用户"),
                url: "/admin/user",
            },
        ]
    },
    {
        id: "access",
        title: t("权限"),
        icon: <IconAccess />,
        children: [
            {
                id: "access.role",
                title: t("角色管理"),
                url: "/admin/access/role",
            },
            {
                id: "access.authority",
                title: t("资源管理"),
                url: "/admin/access/authority",
            },
        ]
    },
    {
        id: "setting",
        title: t("设置"),
        url: "/admin/setting",
        icon: <IconSetting />,
    }
];
