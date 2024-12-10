import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@easykit/design";
import { useAtom } from "jotai";
import {currentEntryState, leftSideOpenState, rightSideOpenState} from "@/state/worktop";
import { useEffect, useRef } from "react";
import { ImperativePanelHandle } from 'react-resizable-panels';
import { EntryPanel } from "@/components/pages/worktop/main/panel/entry";
import { ResultPanel } from "@/components/pages/worktop/main/panel/result";
import { PluginPanel } from "@/components/pages/worktop/main/panel/plugin";
import { useEntriesLoader } from "@/components/layout/worktop/hooks";
import classNames from "classnames";
import bus from "@clover/public/events";
import {ENTRY_RELOAD} from "@/events/worktop";

export const MainPanel = () => {
    const [leftSideOpen, setLeftSideOpen] = useAtom(leftSideOpenState);
    const [rightSideOpen, setRightSideOpen] = useAtom(rightSideOpenState);
    const leftRef = useRef<ImperativePanelHandle>(null);
    const rightRef = useRef<ImperativePanelHandle>(null);

    useEffect(() => {
        leftSideOpen ? leftRef.current?.expand() : leftRef.current?.collapse();
    }, [leftSideOpen]);

    useEffect(() => {
        rightSideOpen ? rightRef.current?.expand() : rightRef.current?.collapse();
    }, [rightSideOpen]);

    return <div className={"flex-1 w-full h-0 flex-shrink-0"}>
        <ResizablePanelGroup direction="horizontal" autoSaveId="module.worktop">
            <ResizablePanel
                className={classNames(
                    leftSideOpen ? "shadow-md" : "hidden"
                )}
                collapsible={true} ref={leftRef} defaultSize={30}
                onCollapse={() => setLeftSideOpen(false)}
                onExpand={() => setLeftSideOpen(true)}
            >
                <EntryPanel />
            </ResizablePanel>
            <ResizableHandle className={leftSideOpen ? "" : "hidden"}/>
            <ResizablePanel defaultSize={40}>
                <ResultPanel />
            </ResizablePanel>
            <ResizableHandle className={rightSideOpen ? "" : "hidden"} />
            <ResizablePanel
                className={classNames(
                    rightSideOpen ? "shadow-md" : "hidden"
                )}
                collapsible={true}
                ref={rightRef}
                defaultSize={30}
                onCollapse={() => setRightSideOpen(false)}
                onExpand={() => setRightSideOpen(true)}
            >
                <PluginPanel />
            </ResizablePanel>
        </ResizablePanelGroup>
    </div>;
}
