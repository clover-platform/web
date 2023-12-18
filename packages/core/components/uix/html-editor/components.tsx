import React, {FC, HTMLAttributes, PropsWithChildren, ReactNode} from "react";
import {useSlate} from "slate-react";
import {isBlockActive, isMarkActive, toggleBlock, toggleMark} from "./utils";
import {TEXT_ALIGN_TYPES} from "./config";
import {cn} from "@atom-ui/core/lib/utils";

export type ElementProps = {
    attributes: any,
    children: any,
    element: any
};

export const Element: FC<ElementProps> = ({ attributes, children, element }) => {
    const style = { textAlign: element.align }
    switch (element.type) {
        case 'block-quote':
            return (
                <blockquote style={style} {...attributes}>
                    {children}
                </blockquote>
            )
        case 'bulleted-list':
            return (
                <ul style={style} {...attributes}>
                    {children}
                </ul>
            )
        case 'heading-one':
            return (
                <h1 style={style} {...attributes}>
                    {children}
                </h1>
            )
        case 'heading-two':
            return (
                <h2 style={style} {...attributes}>
                    {children}
                </h2>
            )
        case 'list-item':
            return (
                <li style={style} {...attributes}>
                    {children}
                </li>
            )
        case 'numbered-list':
            return (
                <ol style={style} {...attributes}>
                    {children}
                </ol>
            )
        default:
            return (
                <p style={style} {...attributes}>
                    {children}
                </p>
            )
    }
}

export type LeafProps = {
    attributes: any,
    children: any,
    leaf: any
} & PropsWithChildren;
export const Leaf: FC<LeafProps> = ({ attributes, children, leaf }) => {
    if (leaf.bold) {
        children = <strong>{children}</strong>
    }

    if (leaf.code) {
        children = <code>{children}</code>
    }

    if (leaf.italic) {
        children = <em>{children}</em>
    }

    if (leaf.underline) {
        children = <u>{children}</u>
    }

    return <span {...attributes}>{children}</span>
}

export type ToolButtonProps = {
    active?: boolean,
} & PropsWithChildren<HTMLAttributes<HTMLButtonElement>>;

export const ToolButton:FC<ToolButtonProps> = (props) => {
    const {
        active,
        ...rest
    } = props;

    return <button {...rest} className={cn(
        "h-8 w-8 flex justify-center items-center text-black/50 rounded-sm",
        "hover:bg-[var(--action-hover)]",
        active && "bg-[var(--action-hover)] text-black"
    )}>
        {props.children}
    </button>
}

export type ButtonProps = {
    format?: string,
    icon?: ReactNode,
}
export const BlockButton: FC<ButtonProps> = ({ format, icon }) => {
    const editor = useSlate()
    return (
        <ToolButton
            active={isBlockActive(
                editor,
                format,
                TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type'
            )}
            onClick={(event) => {
                event.preventDefault()
                toggleBlock(editor, format)
            }}
        >
            { icon }
        </ToolButton>
    )
}

export const MarkButton: FC<ButtonProps> = ({ format, icon }) => {
    const editor = useSlate()
    return (
        <ToolButton
            active={isMarkActive(editor, format)}
            onClick={(event) => {
                event.preventDefault()
                toggleMark(editor, format)
            }}
        >
            { icon }
        </ToolButton>
    )
}
