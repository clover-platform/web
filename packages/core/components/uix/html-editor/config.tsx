import React, {ReactNode} from "react";
import {
    CodeIcon,
    FontBoldIcon,
    FontItalicIcon,
    ListBulletIcon,
    QuoteIcon, TextAlignCenterIcon, TextAlignJustifyIcon,
    TextAlignLeftIcon, TextAlignRightIcon,
    UnderlineIcon
} from "@radix-ui/react-icons";
import {IconH1, IconH2, IconNumberList} from "@arco-iconbox/react-atom-ui";

export const LIST_TYPES = ['numbered-list', 'bulleted-list']
export const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify'];

export type HOTKEYS_TYPE = {
    [key: string]: string
}

export const HOTKEYS: HOTKEYS_TYPE = {
    'mod+b': 'bold',
    'mod+i': 'italic',
    'mod+u': 'underline',
    'mod+`': 'code',
}

export type Toolbar = {
    format?: string,
    icon?: ReactNode,
    type: "mark" | "block" | "divider",
}
export const TOOLBARS: Toolbar[] = [
    {
        format: 'bold',
        icon: <FontBoldIcon />,
        type: "mark",
    },
    {
        format: 'italic',
        icon: <FontItalicIcon />,
        type: "mark",
    },
    {
        format: 'underline',
        icon: <UnderlineIcon />,
        type: "mark",
    },
    {
        type: "divider",
    },
    {
        format: 'code',
        icon: <CodeIcon />,
        type: "mark",
    },
    {
        format: 'heading-one',
        icon: <IconH1 />,
        type: "block",
    },
    {
        format: 'heading-two',
        icon: <IconH2 />,
        type: "block",
    },
    {
        format: 'block-quote',
        icon: <QuoteIcon />,
        type: "block",
    },
    {
        format: 'numbered-list',
        icon: <IconNumberList />,
        type: "block",
    },
    {
        format: 'bulleted-list',
        icon: <ListBulletIcon />,
        type: "block",
    },
    {
        type: "divider",
    },
    {
        format: 'left',
        icon: <TextAlignLeftIcon />,
        type: "block",
    },
    {
        format: 'center',
        icon: <TextAlignCenterIcon />,
        type: "block",
    },
    {
        format: 'right',
        icon: <TextAlignRightIcon />,
        type: "block",
    },
    {
        format: 'justify',
        icon: <TextAlignJustifyIcon />,
        type: "block",
    }
]
