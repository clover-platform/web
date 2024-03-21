'use client';

import { ControlBar } from "@/components/pages/module/worktop/control-bar";
import { MainPanel } from "@/components/pages/module/worktop/main";

export const ModuleWorktopPage = () => {
    return <div className={"flex items-center justify-center flex-col h-screen"}>
        <ControlBar />
        <MainPanel />
    </div>
}
