import { MainLayout as PublicMainLayout, MainLayoutProps as PublicMainLayoutProps } from "@clover/public/components/layout/main";
import {FC} from "react";
import {useLayoutProps} from "@clover/public/components/layout/hooks/use.layout.props";

export type MainLayoutProps = {
    active?: string;
    className?: string;
} & PublicMainLayoutProps;

export const MainLayout: FC<MainLayoutProps> = (origin) => {
    const props = useLayoutProps<MainLayoutProps>(origin);

    return <PublicMainLayout
        {...props}
    >
        { props.children }
    </PublicMainLayout>
}
