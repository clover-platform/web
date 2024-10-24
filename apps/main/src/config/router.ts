//文件自动生成，请勿编辑
import { t } from '@easykit/common/utils/locale';

export default [{ path: "/", config:  {
    name: 'main',
    active: "project",
    path: [
        {
            title: t("项目"),
            type: "item",
        }
    ],
} },{ path: "/link/error/", config:  {
    name: 'login',
} },{ path: "/link/github/", config:  {
    name: 'login',
} },{ path: "/link/wechat/", config:  {
    name: 'login',
} },{ path: "/login/", config:  {
    name: 'login',
} },{ path: "/project/", config:  {
    name: 'main',
    active: "project",
    path: [
        {
            title: t("项目"),
            type: "item",
        }
    ],
} },{ path: "/register/", config:  {
    name: 'login'
} },{ path: "/reset-password/", config:  {
    name: 'login'
} },{ path: "/task/", config:  {
    name: 'main',
    active: "task.list",
    path: [
        {
            title: t("任务"),
            type: "item",
        }
    ],
} },{ path: "/task/gantt/", config:  {
    name: 'main',
    active: "task.gantt",
    path: [
        {
            title: t("任务"),
            type: "item",
        }
    ],
} }]
