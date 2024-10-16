import {
    IconProject,
    IconWiki, IconI18n, IconGantt,
} from "@arco-iconbox/react-clover";
import { MenuItemProps } from "@clover/public/components/layout/main/sidebar/menu-item";

export const NAV_MENUS: MenuItemProps[] = [
    {
        id: "project",
        title: t("项目"),
        url: "/{#LANG#}/project/",
        icon: <IconProject />,
        external: true,
    },
    {
        id: "task",
        title: t("任务"),
        icon: <IconGantt/>,
        children: [
            {
                id: "task.list",
                title: t("任务列表"),
                url: "/{#LANG#}/task/",
                external: true,
            },
            {
                id: "task.gantt",
                title: t("甘特图"),
                url: "/{#LANG#}/task/gantt",
                external: true,
            },
        ]
    },
    {
        id: "wiki",
        title: t("文档"),
        url: "/{#LANG#}/wiki/",
        icon: <IconWiki/>,
        external: true,
    },
    {
        id: "i18n",
        title: t("国际化"),
        url: "/{#LANG#}/i18n/",
        icon: <IconI18n/>,
        external: true,
    },
]

