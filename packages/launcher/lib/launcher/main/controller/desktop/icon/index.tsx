import { Icon } from "@clover/launcher/common/icon";
import { DesktopGroup } from "@clover/launcher/interface";
import { FC, HTMLAttributes } from "react";
import classNames from "classnames";

export type DesktopGroupIconProps = {
    group: DesktopGroup;
    active?: boolean;
} & HTMLAttributes<HTMLDivElement>;

export const DesktopGroupIcon: FC<DesktopGroupIconProps> = (props) => {
    const { group, active = false } = props;
    return <div
        {...props}
        className={classNames(
            props.className,
            "my-2 w-[36px] h-[36px] flex justify-center items-center hover:bg-white/20 rounded-sm group",
            active && "bg-white/20",
        )}
    >
        <Icon
            type={group.icon}
            className={classNames(
                "text-[22px] text-white/70 group-hover:text-white",
                active && "text-white",
            )}
        />
    </div>
}
