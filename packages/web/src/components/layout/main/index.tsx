import { MainLayout as PublicMainLayout } from '@clover/public/components/layout/main';
import { FC, PropsWithChildren } from "react";

export type MainLayoutProps = {} & PropsWithChildren;

export const MainLayout: FC<MainLayoutProps> = (props) => {
    return <PublicMainLayout>
        { props.children }
    </PublicMainLayout>
}
