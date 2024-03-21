import {useGoLogin, useLayoutState} from "@clover/public/components/layout/hooks/main";
import Logo from "@clover/public/components/common/logo";
import {FC, PropsWithChildren} from "react";
import {useWorktopState} from "@/components/layout/worktop/hooks";

export type WorktopLayoutProps = PropsWithChildren;

export const WorktopLayout: FC<WorktopLayoutProps> = (props) => {
    const {loading} = useLayoutState();
    const dataLoading = useWorktopState();
    useGoLogin();

    return loading || dataLoading ? <div className={"min-h-[100vh] flex justify-center items-center"}>
        <Logo type={"light"} className={"bg-transparent animate-spin"}/>
    </div> : props.children;
}
