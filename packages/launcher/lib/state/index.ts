import { atom, useAtom } from "jotai";
import { LauncherConfig } from "../interface";
import { useEffect, useRef } from "react";
import merge from 'lodash/merge';

export const configState = atom<LauncherConfig>({
    view: {
        mode: "full",
        test: 123,
    },
    activeGroup: "home",
    groups: [
        {
            id: "home",
            title: "首页",
            icon: "home",
        },
        {
            id: "develop",
            title: "开发",
            icon: "develop",
        },
        {
            id: "design",
            title: "设计",
            icon: "design",
        }
    ]
});

export const useConfig = () => {
    const [config, setConfig] = useAtom<LauncherConfig>(configState);
    const configRef = useRef(config);

    useEffect(() => {
        configRef.current = config;
    }, [config])

    const updateConfig = (newConfig: LauncherConfig) => {
        setConfig(merge({}, configRef.current, newConfig));
    }

    return {
        config,
        set: setConfig,
        update: updateConfig
    };
}
