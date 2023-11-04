import {PropsWithChildren} from "react";

const MainLayout = (props: PropsWithChildren) => {
    return <div>
        { props.children }
    </div>
};

export default MainLayout;
