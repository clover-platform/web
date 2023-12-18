import NextLink from "next/link";
import type { LinkProps as NextLinkProps } from "next/link";
import {PropsWithChildren, FC} from "react";
import {Button} from "@atom-ui/core";

export type LinkProps = {
    tabIndex?: number;
} & NextLinkProps & PropsWithChildren

const Link: FC<LinkProps> = (props) => {
    return <NextLink {...props}>
        <Button tabIndex={props.tabIndex} type={"button"} variant={"link"} className={"p-0 h-4"}>
            {props.children}
        </Button>
    </NextLink>;
};

export default Link;
