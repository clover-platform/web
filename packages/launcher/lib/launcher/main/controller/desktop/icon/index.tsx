import { Icon } from "@clover-platform/launcher/common/icon";
import { DesktopGroup } from "@clover-platform/launcher/interface";
import {FC, HTMLAttributes, useMemo} from "react";
import classNames from "classnames";

export type DesktopGroupIconProps = {
    group: DesktopGroup;
    active?: string;
} & HTMLAttributes<HTMLDivElement>;

export const DesktopGroupIcon: FC<DesktopGroupIconProps> = (props) => {
    const { group, active = "false" } = props;
    const isActive = useMemo(() => {
        return active === "true";
    }, [active])
    return <div
        {...props}
        className={classNames(
            props.className,
            "my-2 w-[36px] h-[36px] flex justify-center items-center hover:bg-white/20 rounded-sm group",
            isActive && "bg-white/20",
        )}
    >
        <Icon
            type={group.icon}
            className={classNames(
                "text-[22px] text-white/70 group-hover:text-white",
                isActive && "text-white",
            )}
        />
    </div>
}
