import {PropsWithChildren, FC, ReactNode} from "react";
import {useRecoilValue} from "recoil";
import {titleState} from "@clover/common/components/layout/admin/state";
import {useLayoutState} from "@clover/common/components/layout/admin/hooks";
import Switch from "@clover/common/components/layout/admin/switch";
import {cn} from "@clover/core";

export interface HeaderProps extends PropsWithChildren {
    logo?: ReactNode;
    actions?: ReactNode;
}

const Header: FC<HeaderProps> = (props) => {
    const title = useRecoilValue(titleState);
    const { sidebarOpen } = useLayoutState();

    return <div className={cn(
        "h-[var(--header-height)] border-0 border-solid border-b border-[var(--border-color)]",
        "flex justify-center items-center"
    )}>
        <div className={"flex justify-start items-center flex-1"}>
            {
                !sidebarOpen ? <div className={"mr-4 flex justify-start items-center"}>
                    <Switch />
                    { props.logo }
                </div> : null
            }
            <div className={"text-base px-2"}>{ title }</div>
        </div>
        { props.actions }
    </div>
};

export default Header;
