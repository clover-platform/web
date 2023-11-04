import {PropsWithChildren, useCallback, useEffect} from "react";
import {useLayoutState} from "@/components/layout/hooks/main";
import bus from '@clover/common/events';
import {LOGIN} from "@/events/account";
import {usePathname, useRouter} from "next/navigation";

const MainLayout = (props: PropsWithChildren) => {
    const [loading, isLogin, account] = useLayoutState();
    const router = useRouter();
    const path = usePathname();

    const onLogin = useCallback(() => {
        router.push(`/{#LANG#}/login/?form=${encodeURIComponent(path)}`)
    }, [path]);

    useEffect(() => {
        bus.on(LOGIN, onLogin);
        return () => {
            bus.off(LOGIN, onLogin);
        }
    }, []);

    return <div>
        { props.children }
    </div>
};

export default MainLayout;
