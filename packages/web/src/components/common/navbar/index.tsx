import { LayoutNavbar } from '@clover/public/components/layout/main/navbar';
import { FC, PropsWithChildren } from "react";

export type NavbarProps = {
    className?: string;
} & PropsWithChildren;

export const Navbar: FC<NavbarProps> = (props) => {
    return <LayoutNavbar
        className={props.className}
    >
        { props.children }
    </LayoutNavbar>
}
