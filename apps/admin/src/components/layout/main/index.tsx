import { MainLayout as PublicMainLayout, PathProps } from "@clover/public/components/layout/main";
import {FC, PropsWithChildren} from "react";
import {getNavMenus} from "@/config/layout/main";
import {useLayoutProps} from "@clover/public/components/layout/hooks/use.layout.props";
import { t } from '@clover/public/locale'

export type MainLayoutProps = {
    active?: string;
    path?: PathProps[];
    className?: string;
} & PropsWithChildren;

export const MainLayout: FC<MainLayoutProps> = (origin) => {
    const props = useLayoutProps<MainLayoutProps>(origin);
    return <PublicMainLayout
        {...props}
        path={[
            {
                title: t("管理中心"),
                type: "link",
                href: "/admin"
            },
            ...(props.path || [])
        ]}
        sidebarProps={{
            menus: getNavMenus(),
            title: t("管理中心"),
            active: props.active
        }}
    >
        { props.children }
    </PublicMainLayout>
}
