import { Navbar } from "@/components/common/navbar";
import { FC, PropsWithChildren } from "react";

export type PageLayoutProps = {} & PropsWithChildren;

export const PageLayout: FC<PageLayoutProps> = (props) => {
    return <>
        <Navbar />
        <div className={"container p-2"}>{ props.children }</div>
    </>;
}
