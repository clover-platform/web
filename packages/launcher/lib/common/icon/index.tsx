import "@clover-platform/launcher/assets/iconfont/iconfont.css";
import { FC } from "react";
import classNames from "classnames";

export type IconProps = {
    type: string;
    className?: string;
}

export const Icon: FC<IconProps> = (props) => {
    return <i className={classNames("icon clover-tab", props.type && `tab-${props.type}`, props.className)} />
}
