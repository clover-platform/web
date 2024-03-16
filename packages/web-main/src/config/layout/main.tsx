import {
    IconProject,
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
        icon: <IconGantt />,
        children: [
            {
                id: "task.list",
                title: "{#任务列表#}",
                url: "/{#LANG#}/task/",
            },
            {
                id: "task.gantt",
                title: "{#甘特图#}",
                url: "/{#LANG#}/task/gantt",
            },
        ]
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
]

