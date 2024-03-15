import {LoginLayout as PublicLoginLayout} from "@clover/public/components/layout/login";
import { PropsWithChildren } from "react";

export type LoginLayoutProps = PropsWithChildren & {};

const LoginLayout = (props: LoginLayoutProps) => {
    return <PublicLoginLayout>
        { props.children }
    </PublicLoginLayout>
};

export default LoginLayout;
