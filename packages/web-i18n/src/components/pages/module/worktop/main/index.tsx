import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@atom-ui/core";
import { useRecoilValue } from "recoil";
import { leftSideOpenState, rightSideOpenState } from "@/state/worktop";
import { useEffect, useRef } from "react";
import { ImperativePanelHandle } from 'react-resizable-panels';

export const MainPanel = () => {
    const leftSideOpen = useRecoilValue(leftSideOpenState);
    const rightSideOpen = useRecoilValue(rightSideOpenState);
    const leftRef = useRef<ImperativePanelHandle>(null);
    const rightRef = useRef<ImperativePanelHandle>(null);

    useEffect(() => {
        leftSideOpen ? leftRef.current?.expand() : leftRef.current?.collapse();
    }, [leftSideOpen]);

    useEffect(() => {
        rightSideOpen ? rightRef.current?.expand() : rightRef.current?.collapse();
    }, [rightSideOpen]);

    return <div className={"flex-1 w-full"}>
        <ResizablePanelGroup
            direction="horizontal" autoSaveId="module.worktop"
        >
            <ResizablePanel collapsible={true} ref={leftRef} defaultSize={30}>
                left
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={40}>center</ResizablePanel>
            <ResizableHandle />
            <ResizablePanel collapsible={true} ref={rightRef} defaultSize={30}>
                right
            </ResizablePanel>
        </ResizablePanelGroup>
    </div>;
}
