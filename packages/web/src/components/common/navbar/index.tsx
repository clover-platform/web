import { LayoutNavbar } from '@clover/public/components/layout/main/navbar';
import { FC, PropsWithChildren } from "react";

export type NavbarProps = {} & PropsWithChildren;

export const Navbar: FC<NavbarProps> = (props) => {
    return <LayoutNavbar>
        { props.children }
    </LayoutNavbar>
}
