import "./style.css";
import "../assets/font/font.css";
import { Provider } from "jotai";
import { Background } from "@clover/launcher/launcher/background";
import { LauncherConfig } from "@clover/launcher/interface";
import { FC, useEffect } from "react";
import { useConfig } from "@clover/launcher/state";
import { Main } from "@clover/launcher/launcher/main";

export type TabLauncherProps = {
    defaultConfig?: LauncherConfig;
}

const TabLauncherCore: FC<TabLauncherProps> = (props) => {
    const { defaultConfig } = props;
    const { update } = useConfig();

    useEffect(() => {
        defaultConfig && update(defaultConfig);
    }, [defaultConfig])

    return <div className={"fixed top-0 left-0 bottom-0 right-0"}>
        <Background />
        <Main />
    </div>
}

export const TabLauncher: FC<TabLauncherProps> = (props) => {
    return <Provider>
        <TabLauncherCore {...props} />
    </Provider>
};
