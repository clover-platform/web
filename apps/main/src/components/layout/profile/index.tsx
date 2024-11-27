import { MainLayout as PublicMainLayout, PathProps } from "@clover/public/components/layout/main";
import {FC, PropsWithChildren} from "react";
import {useLayoutProps} from "@clover/public/components/layout/hooks/use.layout.props";
import { t } from '@easykit/common/utils/locale';
import {getNavMenus} from "@/config/layout/profile";

export type ProfileLayoutProps = {
    active?: string;
    path?: PathProps[];
    className?: string;
} & PropsWithChildren;

export const ProfileLayout: FC<ProfileLayoutProps> = (origin) => {
    const props = useLayoutProps<ProfileLayoutProps>(origin);

    return <PublicMainLayout
        {...props}
        path={[
            {
                title: t("用户设置"),
                type: "link",
                href: "/profile/-/settings"
            },
            ...(props.path || [])
        ]}
        sidebarProps={{
            menus: getNavMenus(),
            title: t("用户设置"),
            active: props.active
        }}
    >
        { props.children }
    </PublicMainLayout>
}
