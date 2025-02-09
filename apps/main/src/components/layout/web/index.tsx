import {FC} from "react";
import {MainLayout, MainLayoutProps} from "@clover/public/components/layout/main";

export type WebLayoutProps = MainLayoutProps

export const WebLayout: FC<WebLayoutProps> = (props) => {
    return <MainLayout
        navs={[
            {
                title: "首页",
                href: "/",
                id: "home"
            }
        ]}
    >
        { props.children}
    </MainLayout>
}
