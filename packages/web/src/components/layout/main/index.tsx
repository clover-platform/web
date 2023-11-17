import {FC, PropsWithChildren, useCallback, useEffect} from "react";
import {useLayoutState} from "@/components/layout/hooks/main";
import bus from '@clover/common/events';
import {LOGIN} from "@/events/account";
import {usePathname, useRouter} from "next/navigation";
import AdminLayout from "@clover/common/components/layout/admin";
import Logo from "@/components/common/logo";
import {NAV_MENUS} from "@/config/layout/main";

export interface MainLayoutProps extends PropsWithChildren {
    active?: string;
}

const MainLayout: FC<MainLayoutProps> = (props) => {
    const [loading, isLogin, account] = useLayoutState();
    const router = useRouter();
    const path = usePathname();

    const onLogin = useCallback(() => {
        router.push(`/{#LANG#}/login/?from=${encodeURIComponent(path)}`)
    }, [path]);

    useEffect(() => {
        bus.on(LOGIN, onLogin);
        return () => {
            bus.off(LOGIN, onLogin);
        }
    }, []);

    return <AdminLayout
        logo={<Logo theme={"dark"} />}
        navMenus={NAV_MENUS}
        active={props.active}
    >
        { props.children }
    </AdminLayout>
};

export default MainLayout;
