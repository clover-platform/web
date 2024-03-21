'use client';
import classNames from 'classnames';
import { ControlBar } from "@/components/pages/module/worktop/control-bar";
import { MainPanel } from "@/components/pages/module/worktop/main";

export const ModuleWorktopPage = () => {
    return <div
        className={classNames(
            "fixed top-0 right-0 bottom-0 left-0",
            "flex items-center justify-center flex-col",
        )}
    >
        <ControlBar />
        <MainPanel />
    </div>
}
