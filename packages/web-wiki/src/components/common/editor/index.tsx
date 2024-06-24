import styles from './style.module.scss';
import "./editor.css";
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import CharacterCount from '@tiptap/extension-character-count'
import Placeholder from '@tiptap/extension-placeholder'
import Typography from '@tiptap/extension-typography'
import GlobalDragHandle from "@/components/common/editor/extension/global-drag-handle";
import SlashCommand from "@/components/common/editor/extension/slash-command";
import {useHandleId} from "@/components/common/editor/control/drag-handle/use.handle.id";
import {useData} from "@/components/common/editor/control/drag-handle/use.data";
import {
    Document,
    Columns, Column,
    TaskList, TaskItem,
    Heading,
    HorizontalRule,
    Selection,
    CodeBlockLowlight,
    TextStyle,
    FontSize,
    FontFamily,
    Color,
    TrailingNode,
    Link,
    Highlight,
    Underline,
    TextAlign,
    Subscript,
    Superscript,
    Table, TableCell, TableHeader, TableRow,
    Focus,
    Figcaption,
    BlockquoteFigure,
    Dropcursor
} from './extension';
import { lowlight } from 'lowlight';
import {useRef} from "react";
import {EditorController} from "@/components/common/editor/control";

export const limit = 500;

export const Editor = () => {
    const handleId = useHandleId();
    const data = useData();
    const menuContainerRef = useRef(null);

    const editor = useEditor({
        extensions: [
            Document,
            Columns,
            TaskList,
            TaskItem.configure({
                nested: true,
            }),
            Column,
            Selection,
            Heading.configure({
                levels: [1, 2, 3, 4, 5, 6],
            }),
            HorizontalRule,
            StarterKit.configure({
                document: false,
                dropcursor: false,
                heading: false,
                horizontalRule: false,
                blockquote: false,
                history: false,
                codeBlock: false,
            }),
            CharacterCount.configure({
                limit,
            }),
            GlobalDragHandle.configure({
                dragHandleSelector: `#${handleId}`,
                offsetTop: -48-16,
                onNodeChange: data.handleNodeChange,
                onShow: () => data.setHidden(false),
                onHide: () => data.setHidden(true),
            }),
            CodeBlockLowlight.configure({
                lowlight,
                defaultLanguage: null,
            }),
            TextStyle,
            FontSize,
            FontFamily,
            Color,
            TrailingNode,
            Link.configure({
                openOnClick: false,
            }),
            Highlight.configure({ multicolor: true }),
            Underline,
            TextAlign.extend({
                addKeyboardShortcuts() {
                    return {}
                },
            }).configure({
                types: ['heading', 'paragraph'],
            }),
            Subscript,
            Superscript,
            Table,
            TableCell,
            TableHeader,
            TableRow,
            Typography,
            Placeholder.configure({
                includeChildren: true,
                showOnlyCurrent: false,
                placeholder: () => "{#输入 / 快速插入#}",
            }),
            SlashCommand,
            Focus,
            Figcaption,
            BlockquoteFigure,
            Dropcursor.configure({
                width: 2,
                class: 'ProseMirror-dropcursor border-black',
            }),
        ],
        content: '<p>Hello World! 🌎️</p>' +
            '<ul>' +
            '   <li>asas</li>' +
            '   <li>asssssss</li>' +
            '</ul>'
    })

    return <div className={styles.editorContainer} ref={menuContainerRef}>
        <EditorContent
            className={styles.editor}
            editor={editor}
        />
        <EditorController
            editor={editor}
            limit={limit}
            appendTo={menuContainerRef}
            handleId={handleId}
            data={data}
        />
    </div>
}
