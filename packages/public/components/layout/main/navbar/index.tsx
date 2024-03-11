import { FC, PropsWithChildren } from "react";
import Switch from "@clover/public/components/layout/main/switch";
import classNames from "classnames";
import {LangSelect} from "@clover/public/components/common/select/lang";
import { useRecoilValue } from "recoil";
import { sidebarOpenState } from "@clover/public/components/layout/main/state";
import { Popover, PopoverContent, PopoverTrigger, Separator } from "@atom-ui/core";
import { ChevronDownIcon } from "@radix-ui/react-icons";

export type LayoutNavbarProps = {} & PropsWithChildren;

export const LayoutNavbar: FC<LayoutNavbarProps> = (props) => {
    const open = useRecoilValue(sidebarOpenState);

    return <div className={classNames(
        "h-12 border-0 border-b border-solid flex justify-start items-center px-2",
        "flex justify-center items-center"
    )}>
        <div className={"flex-1 flex items-center"}>
            {
                !open ? <>
                    <Switch type={"dark"} />
                    <Separator className={"h-6 mx-2"} orientation={"vertical"} />
                </> : null
            }
            <Popover>
                <PopoverTrigger>
                    请选择项目 <ChevronDownIcon />
                </PopoverTrigger>
                <PopoverContent align={"start"}>
                    content
                </PopoverContent>
            </Popover>
            <span className={"mx-1 opacity-60"}>@</span>
            <Popover>
                <PopoverTrigger>
                    请选择团队 <ChevronDownIcon />
                </PopoverTrigger>
                <PopoverContent align={"start"}>
                    content
                </PopoverContent>
            </Popover>
            { props.children }
        </div>
        <LangSelect />
    </div>
}
