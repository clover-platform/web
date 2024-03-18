import {FC, ReactNode} from "react";
import { Separator } from "@atom-ui/core";
import classNames from "classnames";

export type TitleBarProps = {
    title: string;
    actions?: ReactNode;
    border?: boolean;
}

export const TitleBar: FC<TitleBarProps> = (props) => {
    const {
        border = true,
    } = props;
    return <>
        <div className={classNames(
            "flex justify-center items-center ",
            !border && "mb-4"
        )}>
            <div className={"flex-1 mr-2 text-2xl font-bold"}>{props.title}</div>
            <div>{props.actions}</div>
        </div>
        { border ? <Separator className={"my-4"} /> : null }
    </>
}
