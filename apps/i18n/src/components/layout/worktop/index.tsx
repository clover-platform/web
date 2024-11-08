import {useGoLogin} from "@clover/public/components/layout/hooks/main";
import Logo from "@clover/public/components/common/logo";
import {FC, PropsWithChildren} from "react";
import { useQuerySync, useWorktopState } from "@/components/layout/worktop/hooks";
import {useLayoutProps} from "@clover/public/components/layout/hooks/use.layout.props";

export type WorktopLayoutProps = PropsWithChildren;

export const WorktopLayout: FC<WorktopLayoutProps> = (origin) => {
    const props = useLayoutProps<WorktopLayoutProps>(origin);
    const loading = useWorktopState();
    useGoLogin();
    useQuerySync();

    return loading ? <div className={"min-h-[100vh] flex justify-center items-center"}>
        <Logo type={"light"} className={"bg-transparent animate-spin"}/>
    </div> : props.children;
}
