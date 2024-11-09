import { MainLayout as PublicMainLayout, PathProps } from "@clover/public/components/layout/main";
import { FC, PropsWithChildren, useMemo } from "react";
import { getNavMenus } from "@/config/layout/module";
import {useParams} from "next/navigation";
import {useLayoutProps} from "@clover/public/components/layout/hooks/use.layout.props";
import { t } from '@easykit/common/utils/locale';

export type ModuleLayoutProps = {
    active?: string;
    path?: PathProps[];
    className?: string;
} & PropsWithChildren;

export const ModuleLayout: FC<ModuleLayoutProps> = (origin) => {
    const props = useLayoutProps<ModuleLayoutProps>(origin);
    const { module } = useParams();

    const menus = useMemo(() => {
        return getNavMenus(module as string);
    }, [getNavMenus, module])

    return <PublicMainLayout
        {...props}
        path={[
            {
                title: t("国际化"),
                type: "link",
                href: "/i18n"
            },
            ...(props.path || [])
        ]}
        sidebarProps={{
            menus: menus,
            title: t("国际化"),
            active: props.active
        }}
    >
        { props.children }
    </PublicMainLayout>
}
