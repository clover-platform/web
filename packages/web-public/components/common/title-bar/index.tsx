import {FC, ReactNode} from "react";

export type TitleBarProps = {
    title: string;
    actions?: ReactNode;
}

export const TitleBar: FC<TitleBarProps> = (props) => {
    return <div className={"flex justify-center items-center mb-2"}>
        <div className={"flex-1 mr-2 text-2xl font-bold"}>{props.title}</div>
        <div>{props.actions}</div>
    </div>
}
