import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@atom-ui/core";
import { useRecoilState } from "recoil";
import { leftSideOpenState, rightSideOpenState } from "@/state/worktop";
import { useEffect, useRef } from "react";
import { ImperativePanelHandle } from 'react-resizable-panels';
import { EntryPanel } from "@/components/pages/module/worktop/main/panel/entry";
import { ResultPanel } from "@/components/pages/module/worktop/main/panel/result";
import { PluginPanel } from "@/components/pages/module/worktop/main/panel/plugin";
import { DataCheckPanel } from "@/components/pages/module/worktop/main/panel/data-check";
import { useEntriesLoader } from "@/components/layout/worktop/hooks";
import classNames from "classnames";

export const MainPanel = () => {
    const [leftSideOpen, setLeftSideOpen] = useRecoilState(leftSideOpenState);
    const [rightSideOpen, setRightSideOpen] = useRecoilState(rightSideOpenState);
    const leftRef = useRef<ImperativePanelHandle>(null);
    const rightRef = useRef<ImperativePanelHandle>(null);
    const {pages, total, entries, loading, load} = useEntriesLoader();

    useEffect(() => {
        leftSideOpen ? leftRef.current?.expand() : leftRef.current?.collapse();
    }, [leftSideOpen]);

    useEffect(() => {
        rightSideOpen ? rightRef.current?.expand() : rightRef.current?.collapse();
    }, [rightSideOpen]);

    return <div className={"flex-1 w-full h-0 flex-shrink-0"}>
        <DataCheckPanel>
            <ResizablePanelGroup direction="horizontal" autoSaveId="module.worktop">
                <ResizablePanel
                    className={classNames(
                        leftSideOpen ? "shadow-md" : "hidden"
                    )}
                    collapsible={true} ref={leftRef} defaultSize={30}
                    onCollapse={() => setLeftSideOpen(false)}
                    onExpand={() => setLeftSideOpen(true)}
                >
                    <EntryPanel
                        pages={pages}
                        total={total}
                        entries={entries}
                        loading={loading}
                        load={load}
                    />
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
        </DataCheckPanel>
    </div>;
}
