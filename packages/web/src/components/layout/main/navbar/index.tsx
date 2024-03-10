import Switch from "@/components/layout/main/switch";
import {useRecoilState, useRecoilValue} from "recoil";
import {sidebarOpenState} from "@/components/layout/main/state";
import classNames from "classnames";
import {LangSelect} from "@/components/common/select/lang";

export const LayoutNavbar = () => {
    const open = useRecoilValue(sidebarOpenState);

    return <div className={classNames(
        "h-12 border-0 border-b border-solid flex justify-start items-center px-2",
        "flex justify-center items-center"
    )}>
        <div className={"flex-1 flex items-center"}>
            { !open ? <Switch className={"mr-2"} type={"dark"} /> : null }
            navbar
        </div>
        <LangSelect />
    </div>
}
