import { PropsWithChildren, FC, Children } from "react";
import {cn} from "@clover/core/lib/utils";

export interface SpaceProps extends PropsWithChildren {
    itemClassName?: string;
    className?: string;
}

export const Space: FC<SpaceProps> = (props) => {
    return <div className={cn("flex justify-center items-center", props.className)}>
        {
            Children.map(props.children, (child) => {
                return <div className={cn("m-2", props.itemClassName)}>{ child }</div>;
            })
        }
    </div>
};
