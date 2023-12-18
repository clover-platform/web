import { FC } from "react";
import { IconSpin } from "@atom-ui/core/icon";
import {cn} from "@atom-ui/core/lib/utils";

export type SpinProps = {
    className?: string;
};

export const Spin: FC<SpinProps> = (props) => {
    return <IconSpin className={cn(
        "animate-spin mr-1",
        props.className,
    )} />;
}
