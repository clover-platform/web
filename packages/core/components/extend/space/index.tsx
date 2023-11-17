import { PropsWithChildren, FC, Children } from "react";

export interface SpaceProps extends PropsWithChildren {}

export const Space: FC<SpaceProps> = (props) => {
    return <div className={"flex justify-center items-center"}>
        {
            Children.map(props.children, (child) => {
                return <div className={"m-2"}>{ child }</div>;
            })
        }
    </div>
};
