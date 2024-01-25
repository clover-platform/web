import "./style.css";
import { FC, useEffect, useMemo, useRef } from "react";
import Sortable from 'sortablejs';
import { useConfig } from "@/state";
import { DesktopIcon } from "@/launcher/main/desktop/icon";
import { DesktopApp, DesktopGroup } from "@/interface";
import classNames from "classnames";
import { useScrollAndWheel } from "@/hooks/use.scroll.ts";

type AppContainerProps = {
    apps: DesktopApp[];
    active?: boolean;
}

const AppContainer: FC<AppContainerProps> = (props) => {
    const { apps, active } = props;
    const appsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        Sortable.create(appsRef.current, {
            animation: 200,
        });
    }, [])

    const desktopIcons = useMemo(() => {
        return apps?.map((props) => {
            return <DesktopIcon key={props.id} {...props}/>
        })
    }, [apps]);

    return <div
        className={classNames(
            "app-icons z-0",
            active && "z-10"
        )}
        ref={appsRef}
    >
        { desktopIcons }
    </div>;
}

export const Desktop = () => {
    const { config } = useConfig();
    const innerRef = useRef<HTMLDivElement>(null);

    useScrollAndWheel(({scroll, wheel}) => {
        console.log(scroll, wheel);
    }, innerRef.current)

    const groups = useMemo(() => {
        const { apps, groups } = config;
        return groups?.map<DesktopGroup & {apps: DesktopApp[]}>((group) => {
            return {
                ...group,
                apps: apps?.filter((app) => group.id === app.group) || [],
            }
        })
    }, [config]);

    return <div className={"flex-1 apps"}>
        <div className={"inner"} ref={innerRef}>
            {
                groups.map((group) => {
                    return <AppContainer active={group.id === config.activeGroup} key={group.id} apps={group.apps} />
                })
            }
        </div>
    </div>;
}
