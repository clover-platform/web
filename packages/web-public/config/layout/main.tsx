import {
    IconProject,
    IconWiki, IconI18n, IconGantt,
} from "@arco-iconbox/react-clover";
import { MenuItemProps } from "@clover/public/components/layout/main/sidebar/menu-item";
import {FIX_ICON_PROPS} from "@easy-kit/common/utils/icon";

export const NAV_MENUS: MenuItemProps[] = [
    {
        id: "project",
        title: "{#项目#}",
        url: "/{#LANG#}/project/",
        icon: <IconProject {...FIX_ICON_PROPS}/>,
        external: true,
    },
    {
        id: "task",
        title: "{#任务#}",
        icon: <IconGantt {...FIX_ICON_PROPS}/>,
        children: [
            {
                id: "task.list",
                title: "{#任务列表#}",
                url: "/{#LANG#}/task/",
                external: true,
            },
            {
                id: "task.gantt",
                title: "{#甘特图#}",
                url: "/{#LANG#}/task/gantt",
                external: true,
            },
        ]
    },
    {
        id: "wiki",
        title: "{#文档#}",
        url: "/{#LANG#}/wiki/",
        icon: <IconWiki {...FIX_ICON_PROPS}/>,
        external: true,
    },
    {
        id: "i18n",
        title: "{#国际化#}",
        url: "/{#LANG#}/i18n/",
        icon: <IconI18n {...FIX_ICON_PROPS}/>,
        external: true,
    },
]

