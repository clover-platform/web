import {ElementProps, LeafProps, Element, Leaf, MarkButton, BlockButton} from "./components";
import {Editor, Element as SlateElement, Transforms} from "slate";
import {TEXT_ALIGN_TYPES, LIST_TYPES, Toolbar} from "./config";
import React from "react";
import {Separator} from "@atom-ui/core/components/ui/separator";

export const renderElement = (props: ElementProps) => <Element {...props} />;
export const renderLeaf = (props: LeafProps) => <Leaf {...props} />;

export const toggleBlock = (editor: Editor, format: string) => {
    const isActive = isBlockActive(
        editor,
        format,
        TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type'
    )
    const isList = LIST_TYPES.includes(format)

    Transforms.unwrapNodes(editor, {
        match: n =>
            !Editor.isEditor(n) &&
            SlateElement.isElement(n) &&
            LIST_TYPES.includes((n as any).type) &&
            !TEXT_ALIGN_TYPES.includes(format),
        split: true,
    })
    let newProperties: Partial<SlateElement> | any;
    if (TEXT_ALIGN_TYPES.includes(format)) {
        newProperties = {
            align: isActive ? undefined : format,
        }
    } else {
        newProperties = {
            type: isActive ? 'paragraph' : isList ? 'list-item' : format,
        }
    }
    Transforms.setNodes<SlateElement>(editor, newProperties)

    if (!isActive && isList) {
        const block = { type: format, children: [] }
        Transforms.wrapNodes(editor, block)
    }
}

export const toggleMark = (editor: Editor, format: string) => {
    const isActive = isMarkActive(editor, format)

    if (isActive) {
        Editor.removeMark(editor, format)
    } else {
        Editor.addMark(editor, format, true)
    }
}

export const isBlockActive = (editor: Editor, format: string, blockType = 'type') => {
    const { selection } = editor
    if (!selection) return false

    const [match] = Array.from(
        Editor.nodes(editor, {
            at: Editor.unhangRange(editor, selection),
            match: n =>
                !Editor.isEditor(n) &&
                SlateElement.isElement(n) &&
                (n as any)[blockType] === format,
        })
    )

    return !!match
}

export const isMarkActive = (editor: Editor, format: string) => {
    const marks = Editor.marks(editor)
    return marks ? (marks as any)[format] === true : false
}

export const renderToolbarItem = (item: Toolbar, index: number) => {
    const {
        type,
        ...rest
    } = item;
    if(type === "mark") {
        return <MarkButton key={item.format} {...rest} />
    }else if(type === "block") {
        return <BlockButton key={item.format} {...rest} />
    }else if(type === "divider") {
        return <Separator key={`${type}${index}`} className={"h-4"} orientation={"vertical"} />
    }else {
        return null;
    }
}
