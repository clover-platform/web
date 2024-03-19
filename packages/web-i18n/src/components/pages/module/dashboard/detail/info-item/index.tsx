import { FC, PropsWithChildren } from "react";

export type DetailInfoItemProps = PropsWithChildren<{
    label: string;
}>

export const DetailInfoItem: FC<DetailInfoItemProps> = (props) => {
    return <div className={"flex justify-center items-center"}>
        <div className={"flex-1 text-muted-foreground"}>{props.label}</div>
        <div>{props.children}</div>
    </div>
}
