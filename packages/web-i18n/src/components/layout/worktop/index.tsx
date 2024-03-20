import {useGoLogin, useLayoutState} from "@clover/public/components/layout/hooks/main";
import Logo from "@clover/public/components/common/logo";
import {FC, PropsWithChildren} from "react";

export type WorktopLayoutProps = PropsWithChildren;

export const WorktopLayout: FC<WorktopLayoutProps> = (props) => {
    const {loading} = useLayoutState();
    useGoLogin();

    return loading ? <div className={"min-h-[100vh] flex justify-center items-center"}>
        <Logo type={"light"} className={"bg-transparent animate-spin"}/>
    </div> : props.children;
}
