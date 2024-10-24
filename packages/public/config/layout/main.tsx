import {
    IconProject,
    IconWiki, IconI18n, IconGantt,
} from "@arco-iconbox/react-clover";
import { MenuItemProps } from "@clover/public/components/layout/main/sidebar/menu-item";
import { t } from '@easykit/common/utils/locale';

export const getNavMenus = (): MenuItemProps[] => {
    return [
        {
            id: "project",
            title: t("项目"),
            url: `/${t("LANG")}/project/`,
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
                    url: `/${t("LANG")}/task/`,
                    external: true,
                },
                {
                    id: "task.gantt",
                    title: t("甘特图"),
                    url: `/${t("LANG")}/task/gantt`,
                    external: true,
                },
            ]
        },
        {
            id: "wiki",
            title: t("文档"),
            url: `/${t("LANG")}/wiki/`,
            icon: <IconWiki/>,
            external: true,
        },
        {
            id: "i18n",
            title: t("国际化"),
            url: `/${t("LANG")}/i18n/`,
            icon: <IconI18n/>,
            external: true,
        },
    ];
}
