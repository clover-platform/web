import { atom, useRecoilState } from "recoil";
import { LauncherConfig } from "../interface.ts";
import { useEffect, useRef } from "react";
import merge from 'lodash/merge';

export const configState = atom<LauncherConfig>({
    key: 'config',
    default: {
        view: {
            mode: "full",
            test: 123,
        },
        background: {
            type: "image",
            image: "https://clover-assets.oss-accelerate.aliyuncs.com/background.jpeg",
        }
    }
});

export const useConfig = () => {
    const [config, setConfig] = useRecoilState<LauncherConfig>(configState);
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
