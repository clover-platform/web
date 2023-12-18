import {RecoilRoot} from "recoil";
import {PropsWithChildren, FC} from "react";

export const StateRoot:FC<PropsWithChildren> = (props) => {
    return <RecoilRoot>{props.children}</RecoilRoot>
}
