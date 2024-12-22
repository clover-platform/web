import {
    IconWiki, IconI18n, IconGantt, IconTeam, IconDashboard,
} from "@arco-iconbox/react-clover";
import { MenuItemProps } from "@clover/public/components/layout/main/sidebar/menu-item";
import { t } from '@clover/public/locale';

export const getNavMenus = (): MenuItemProps[] => {
    return [
        {
            id: "dashboard",
            title: t("控制台"),
            url: `/dashboard`,
            icon: <IconDashboard />,
            external: true,
        },
        {
            id: "project&team",
            title: t("项目与团队"),
            icon: <IconTeam />,
            children: [
                {
                    id: "project",
                    title: t("项目"),
                    url: `/project`,
                    external: true,
                },
                {
                    id: "team",
                    title: t("团队"),
                    url: `/team`,
                    external: true,
                },
            ]
        },
        {
            id: "task",
            title: t("任务"),
            icon: <IconGantt/>,
            children: [
                {
                    id: "task.list",
                    title: t("任务列表"),
                    url: `/task`,
                    external: true,
                },
                {
                    id: "task.gantt",
                    title: t("甘特图"),
                    url: `/task/gantt`,
                    external: true,
                },
            ]
        },
        {
            id: "wiki",
            title: t("文档"),
            url: `/wiki`,
            icon: <IconWiki/>,
            external: true,
        },
        {
            id: "i18n",
            title: t("国际化"),
            url: `/i18n`,
            icon: <IconI18n/>,
            external: true,
        },
    ];
}
