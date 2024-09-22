import classNames from "classnames";
import { Card } from "@atom-ui/core";
import { FC } from "react";
import { IconTitle, IconTitleProps } from "@clover/public/components/common/icon-title";

export type CardButtonProps = {
    className?: string;
    onClick?: () => void;
} & IconTitleProps;

export const CardButton: FC<CardButtonProps> = (props) => {
    const titleProps: IconTitleProps = props;
    return <Card
        onClick={props.onClick}
        className={classNames(
            "shadow-none cursor-pointer",
            "hover:shadow",
            props.className
        )}
        contentClassName={"p-4"}
    >
        <IconTitle {...titleProps} />
    </Card>
}
