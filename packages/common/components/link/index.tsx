import NextLink from "next/link";
import type { LinkProps } from "next/link";
import {PropsWithChildren, FC} from "react";

const Link: FC<LinkProps & PropsWithChildren> = (props) => {
    return <NextLink className={"inline-block no-underline transition-colors hover:text-foreground text-muted-foreground"} {...props}>{props.children}</NextLink>;
};

export default Link;
