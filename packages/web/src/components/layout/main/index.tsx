import {PropsWithChildren, useCallback, useEffect} from "react";
import {useLayoutState} from "@/components/layout/hooks/main";
import bus from '@clover/common/events';
import {LOGIN} from "@/events/account";
import {usePathname, useRouter} from "next/navigation";
import AdminLayout from "@clover/common/components/layout/admin";

const MainLayout = (props: PropsWithChildren) => {
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

    return <AdminLayout>
        { props.children }
    </AdminLayout>
};

export default MainLayout;
