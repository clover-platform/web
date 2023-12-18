import { serialize } from './serialize';
import {forwardRef} from "react";
import "github-markdown-css/github-markdown.css";
import {cn} from "@atom-ui/core/lib/utils";
import './style.css';

export type HTMLParserProps = {
    value?: any,
    onChange?: (value: any) => void,
    className?: string,
    empty?: string,
}

export const HTMLParser = forwardRef<HTMLDivElement, HTMLParserProps>((props, ref) => {
    const nodes = props.value || [];
    const { empty = "" } = props;
    return <div className={cn("markdown-body", props.className)} ref={ref} dangerouslySetInnerHTML={{__html: nodes.map(serialize).join('') || empty}}/>
})
