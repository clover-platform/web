import { Icon, IconProps } from "@clover/launcher/common/icon";
import { FC } from "react";
import classNames from "classnames";

export type IconButtonProps = {} & IconProps & React.HTMLAttributes<HTMLDivElement>;

export const IconButton: FC<IconButtonProps> = (props) => {
    return <div
        {...props}
        className={classNames(
            "group w-8 h-8 flex justify-center items-center rounded-md",
            "hover:bg-black/20",
            props.className
        )}
    >
        <Icon type={props.type} className={"text-white/70 !text-2xl drop-shadow-[0_0_8px_rgba(0,0,0,0.6)] group-hover:text-white"} />
    </div>
}
