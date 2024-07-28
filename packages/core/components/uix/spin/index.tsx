import { FC } from "react";
import { cn } from "@atom-ui/core/lib/utils";
import { IconSpin } from "@arco-iconbox/react-clover";

export type SpinProps = {
    className?: string;
};

export const Spin: FC<SpinProps> = (props) => {
    return <IconSpin className={cn("animate-spin", props.className)} />;
}
