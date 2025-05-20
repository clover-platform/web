import { FC, PropsWithChildren } from "react";

export type DetailTitleProps = PropsWithChildren<{
  title: string;
}>


export const DetailTitle: FC<DetailTitleProps> = (props) => {
  return <div className={"flex justify-center items-center mb-4"}>
    <div className={"flex-1 text-lg font-medium"}>{props.title}</div>
    <div className={"text-muted-foreground"}>{props.children}</div>
  </div>
}
