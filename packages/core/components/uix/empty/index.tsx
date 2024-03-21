import {FC, ReactNode} from "react";
import {IconEmpty} from "@arco-iconbox/react-atom-ui";

export type EmptyProps = {
    text?: string;
    icon?: ReactNode;
}

export const Empty: FC<EmptyProps> = (props) => {
    return <div className={"flex justify-center items-center flex-col p-4"}>
        <div>
            { props.icon || <IconEmpty className={"text-6xl text-muted-foreground opacity-60"} /> }
        </div>
        <div className={"text-gray-400 text-sm"}>{props.text || "{#暂无数据#}"}</div>
    </div>
}