import { FC } from "react";
import { cn } from "@atom-ui/core/lib/utils";
import { IconSpin } from "@arco-iconbox/react-clover";
import {FIX_ICON_PROPS} from "@easy-kit/common/utils/icon";

export type SpinProps = {
    className?: string;
};

export const Spin: FC<SpinProps> = (props) => {
    return <IconSpin
        {...FIX_ICON_PROPS}
        className={cn(
            "animate-spin mr-1",
            props.className,
        )}
    />;
}
