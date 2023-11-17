import { MenuItemProps } from "@clover/common/components/layout/admin/sidebar";
import { IconHome, IconProject, IconTodo, IconAccess, IconUser } from "@arco-iconbox/react-clover";

export const NAV_MENUS: MenuItemProps[] = [
    {
        id: "home",
        title: "{#首页#}",
        url: "/{#LANG#}/",
        active: true,
        icon: <IconHome />
    },
    {
        id: "project",
        title: "{#项目管理#}",
        url: "/{#LANG#}/project/",
        icon: <IconProject />
    },
    {
        id: "todo",
        title: "{#待办事项#}",
        url: "/{#LANG#}/todo/",
        icon: <IconTodo />
    },
    {
        id: "user",
        title: "{#用户管理#}",
        url: "/{#LANG#}/user/",
        icon: <IconUser />
    },
    {
        id: "access",
        title: "{#权限管理#}",
        url: "/{#LANG#}/access/",
        icon: <IconAccess />
    }
]
