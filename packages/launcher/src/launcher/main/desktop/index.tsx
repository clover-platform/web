import "./style.css";
import { useEffect, useMemo, useRef } from "react";
import Sortable from 'sortablejs';
import { useConfig } from "@/state";
import { DesktopIcon } from "@/launcher/main/desktop/icon";

export const Desktop = () => {
    const appsRef = useRef<HTMLDivElement>(null);

    const { config } = useConfig();

    const desktopIcons = useMemo(() => {
        return config.apps?.map((props) => {
            return <DesktopIcon key={props.id} {...props}/>
        })
    }, [config.apps]);

    useEffect(() => {
        Sortable.create(appsRef.current, {
            animation: 200,
        });
    }, [])

    return <div className={"flex-1 apps"}>
        <div className={"app-icons"} ref={appsRef}>
            { desktopIcons }
        </div>
    </div>;
}
