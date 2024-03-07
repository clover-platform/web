import {useRecoilState, useRecoilValue} from "recoil";
import {sidebarOpenState} from "@/components/layout/main/state";
import {useEffect, useState} from "react";
import localforage from "localforage";
import {SIDEBAR_OPEN_KEY} from "@/components/layout/main/const";

export const useLayoutState = () => {
    const sidebarOpen = useRecoilValue(sidebarOpenState);
    return {
        sidebarOpen
    }
}

export const useInitLayoutState = () => {
    const [init, setInit] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useRecoilState(sidebarOpenState);

    useEffect(() => {
        localforage.getItem<boolean>(SIDEBAR_OPEN_KEY).then((value) => {
            setSidebarOpen(value === null ? true: value);
            setInit(true);
        });
    }, []);

    return init;
}
