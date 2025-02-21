import {FC, ReactNode} from "react";

export type IconTitleProps = {
  icon: ReactNode;
  title: ReactNode;
  description: ReactNode;
}

export const IconTitle: FC<IconTitleProps> = (props) => {
  return <div className={"flex justify-start items-start"}>
    <div className={"w-20 h-14 flex justify-center items-center"}>{props.icon}</div>
    <div className={"flex-1"}>
      <div className={"text-lg text-primary font-bold"}>{props.title}</div>
      <div className={"mt-1 text-muted-foreground"}>{props.description}</div>
    </div>
  </div>
}
