import {useRecoilState, useRecoilValue} from "recoil";
import {sidebarOpenState, titleState} from "@clover/common/components/layout/admin/state";
import {useEffect, useState} from "react";
import localforage from "localforage";
import {SIDEBAR_OPEN_KEY} from "@clover/common/components/layout/admin/const";

export const useLayoutTitle = (title: string) => {
    const [_, setTitle] = useRecoilState(titleState);
    useEffect(() => {
        setTitle(title);
        return () => {
            setTitle("");
        }
    }, []);
    return _;
}

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
            setSidebarOpen(!!value);
            setInit(true);
        });
    }, []);

    return init;
}
