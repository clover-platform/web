import { PropsWithChildren, FC, Children } from "react";
import {cn} from "@clover/core/lib/utils";

export interface SpaceProps extends PropsWithChildren {
    className?: string;
    direction?: "horizontal" | "vertical";
}

export const Space: FC<SpaceProps> = (props) => {
    const {
        direction = "horizontal",
        className,
    } = props;
    return <div className={cn(
        "flex justify-center items-center",
        direction === "vertical" ? "flex-col space-y-2" : null,
        direction === "horizontal" ? "flex-row space-x-2" : null,
        className,
    )}>
        { props.children }
    </div>
};
