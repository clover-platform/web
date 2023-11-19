import NextLink from "next/link";
import type { LinkProps } from "next/link";
import {PropsWithChildren, FC} from "react";
import {Button} from "@clover/core";

const Link: FC<LinkProps & PropsWithChildren> = (props) => {
    return <NextLink {...props}>
        <Button variant={"link"} className={"p-0 h-4"}>
            {props.children}
        </Button>
    </NextLink>;
};

export default Link;
