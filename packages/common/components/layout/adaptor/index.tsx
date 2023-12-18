'use client';
import { pathToRegexp } from "path-to-regexp";
import {useParams, usePathname} from "next/navigation";
import {useEffect, useMemo, useState} from "react";
import { isMobile } from "@easy-kit/common/utils";

const getDefaultLayout = (routers: any) => {
    const defaultLayout = (routers || []).find(({path}: any) => (!path));
    return defaultLayout ? defaultLayout.component : null;
}

const LayoutAdaptor = (props: any) => {
    const {
        children,
        routers = []
    } = props;

    const pathname = usePathname();
    const params = useParams();
    const [init, setInit] = useState(true);

    useEffect(() => {
        const resize = () => {
            isMobile() ?
                document.querySelector("html")?.classList.add("mobile") :
                document.querySelector("html")?.classList.remove("mobile");
            setInit(false);
        }
        resize();
        window.addEventListener('resize', resize);
        return () => {
            window.removeEventListener('resize', resize);
        }
    }, []);

    return useMemo(() => {
        const { LANG } = params;
        let Container = getDefaultLayout(routers);
        let containerProps = {};
        for(let i of routers) {
            if(!i.path) continue;
            for(let p of i.path) {
                let isArrayPath = Array.isArray(p);
                const pStr = isArrayPath ? p[0] : p;
                const pProps = isArrayPath ? p[1] : {};
                if(pathToRegexp(`/${LANG}${pStr}`).test(pathname)) {
                    Container = i.component;
                    containerProps = { ...pProps };
                    break;
                }
            }
        }
        if(!Container) return init ? null : children;
        return init ? null : <Container { ...containerProps }>
            {children}
        </Container>;
    }, [pathname, params, children, routers, init])
}

export default LayoutAdaptor;
