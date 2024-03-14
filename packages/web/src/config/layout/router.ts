import routerConfig from '@/config/router';
import { getRouters } from "@next/router-config/utils";
import LoginLayout from "@/components/layout/login";
import AccessLayout from "@/components/layout/access";
import { MainLayout } from "@/components/layout/main";
import {AdminLayout} from "@/components/layout/admin";

export const LAYOUTS = {
    "main": MainLayout,
    "login": LoginLayout,
    "access": AccessLayout,
    "admin": AdminLayout,
}

/**
 布局的配置，不在手动维护
 请在对应的 page.js 文件 export layoutConfig，由自动化工具生成到 config/router.js
 */
export const routers = getRouters({
    layouts: LAYOUTS,
    configs: routerConfig,
    defaultComponent: MainLayout
});
