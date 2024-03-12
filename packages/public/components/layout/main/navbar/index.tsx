import { FC, PropsWithChildren } from "react";
import Switch from "@clover/public/components/layout/main/switch";
import classNames from "classnames";
import {LangSelect} from "@clover/public/components/common/select/lang";
import { useRecoilValue } from "recoil";
import { sidebarOpenState } from "@clover/public/components/layout/main/state";
import { Separator, } from "@atom-ui/core";
import {TeamsSwitcher} from "@clover/public/components/layout/main/navbar/switcher/teams";
import {ProjectsSwitcher} from "@clover/public/components/layout/main/navbar/switcher/projects";

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
            <ProjectsSwitcher />
            <span className={"mx-2 opacity-60"}>@</span>
            <TeamsSwitcher />
            { props.children }
        </div>
        <LangSelect />
    </div>
}
