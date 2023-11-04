import {PropsWithChildren} from "react";

const LoginLayout = (props: PropsWithChildren) => {
    return <div>
        layout login
        { props.children }
    </div>
};

export default LoginLayout;
