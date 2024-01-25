import { useEffect } from "react";

export type UseScrollAndWheelDeps = HTMLElement | HTMLDivElement;
export type UseScrollAndWheelEvent = {
    scroll: Event;
    wheel: Event;
}
export type UseScrollAndWheelCallback = (event: UseScrollAndWheelEvent) => void;

export const useScrollAndWheel = (call: UseScrollAndWheelCallback, dom: UseScrollAndWheelDeps) => {
    useEffect(() => {
        if(!dom) return;
        const event: UseScrollAndWheelEvent = {
            scroll: null,
            wheel: null
        }
        const onScroll = (e: any) => {
            event.scroll = e;
            call(event);
        };
        const onWheel = (e: any) => {
            event.wheel = e;
            call(event);
        };
        dom.addEventListener("scroll", onScroll);
        dom.addEventListener("wheel", onWheel);
        return () => {
            dom.removeEventListener("scroll", onScroll);
            dom.removeEventListener("wheel", onWheel);
        };
    }, [dom]);
}
