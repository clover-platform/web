'use client';
import classNames from 'classnames';
import {Progress, ResizablePanelGroup, ResizablePanel, ResizableHandle, Separator} from "@atom-ui/core";
import {Action} from "@clover/public/components/common/action";
import {
    IconBack,
    IconBranch,
    IconLeftSidebar,
    IconMenu,
    IconRightSidebar,
    IconSetting
} from "@arco-iconbox/react-clover";

export const ModuleWorktopPage = () => {
    return <div className={classNames(
        "fixed top-0 right-0 bottom-0 left-0",
        "flex items-center justify-center flex-col",
    )}>
        <div className={"w-full"}>
            <Progress value={80} className={"rounded-none h-1"} />
            <div className={"flex justify-center items-center px-2 py-1 border-b shadow-sm"}>
                <div className={"flex-1 flex justify-start items-center space-x-1"}>
                    <Action className={"!px-1.5 h-8"}>
                        <IconBack className={"text-lg"} />
                    </Action>
                    <Action className={"!px-1.5 h-8"}>
                        <IconMenu className={"text-lg"} />
                    </Action>
                    <Separator orientation={"vertical"} className={"h-5"} />
                    <Action className={"!px-1.5 h-8"}>
                        简体中文
                    </Action>
                    <Action className={"!px-1.5 h-8"}>
                        <IconBranch className={"mr-1"}/> main
                    </Action>
                </div>
                <div className={"flex-1 flex justify-end items-center space-x-1"}>
                    <Action className={"!px-1.5 h-8"}>
                        <IconLeftSidebar className={"text-lg"} />
                    </Action>
                    <Action className={"!px-1.5 h-8"}>
                        <IconRightSidebar className={"text-lg"} />
                    </Action>
                    <Separator orientation={"vertical"} className={"h-5"} />
                    <Action className={"!px-1.5 h-8"}>
                        <IconSetting className={"text-lg"} />
                    </Action>
                </div>
            </div>
        </div>
        <div className={"flex-1 w-full"}>
            <ResizablePanelGroup direction="horizontal">
                <ResizablePanel defaultSize={20}>left</ResizablePanel>
                <ResizableHandle withHandle={true} />
                <ResizablePanel>center</ResizablePanel>
                <ResizableHandle withHandle={true} />
                <ResizablePanel defaultSize={20}>right</ResizablePanel>
            </ResizablePanelGroup>
        </div>
    </div>
}
