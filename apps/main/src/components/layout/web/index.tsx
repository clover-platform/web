import {FC} from "react";
import {MainLayout, MainLayoutProps} from "@clover/public/components/layout/main";
import {HeaderExtend} from "@/components/layout/web/header-extend";
import {useLayoutProps} from "@clover/public/components/layout/hooks/use.layout.props";

export type WebLayoutProps = MainLayoutProps & {
    active?: string;
};

export const WebLayout: FC<WebLayoutProps> = (origin) => {
    const props = useLayoutProps<WebLayoutProps>(origin);

    return <MainLayout headerExtend={<HeaderExtend active={props.active} />}>
        { props.children}
    </MainLayout>
}
