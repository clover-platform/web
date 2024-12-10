import {
    IconProject,
    IconWiki, IconI18n, IconGantt,
} from "@arco-iconbox/react-clover";
import { MenuItemProps } from "@clover/public/components/layout/main/sidebar/menu-item";
import { t } from '@clover/public/locale';

export const getNavMenus = (): MenuItemProps[] => {
    return [
        {
            id: "settings",
            title: t("用户资料"),
            url: `/profile/-/settings`,
            icon: <IconProject />,
        },
        {
            id: "preferences",
            title: t("偏好设置"),
            url: `/profile/-/preferences`,
            icon: <IconProject />,
        },
        {
            id: "access.tokens",
            title: t("访问令牌"),
            url: `/profile/-/access/tokens`,
            icon: <IconProject />,
        },
    ];
}
