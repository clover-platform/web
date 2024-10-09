import {useEditor as useBaseEditor} from '@tiptap/react'
import {
    BlockquoteFigure,
    CodeBlockLowlight, Color,
    Column,
    Columns,
    Document, Dropcursor, Figcaption, Focus, FontFamily, FontSize,
    Heading, Highlight,
    HorizontalRule, ImageBlock, ImageUpload, Link,
    Selection, Subscript, Superscript, Table, TableCell, TableHeader, TableRow,
    TaskItem,
    TaskList, TextAlign, TextStyle, TrailingNode, Underline
} from "@/components/common/editor/extension";
import StarterKit from "@tiptap/starter-kit";
import CharacterCount from "@tiptap/extension-character-count";
import GlobalDragHandle from "@/components/common/editor/extension/global-drag-handle";
import {common, createLowlight} from "lowlight";
import Typography from "@tiptap/extension-typography";
import Placeholder from "@tiptap/extension-placeholder";
import SlashCommand from "@/components/common/editor/extension/slash-command";
import {useHandleId} from "@/components/common/editor/control/drag-handle/use.handle.id";
import {NodeData, useData} from "@/components/common/editor/control/drag-handle/use.data";
import {Editor as EditorInstance} from '@tiptap/core';
import { Node as ProseMirrorNode } from '@tiptap/pm/model'

export type UseEditorProps = {
    limit?: number;
    value?: string;
    onChange?: (value: string) => void;
    editable?: boolean;
    onReadOnlyChecked?: (node: ProseMirrorNode, checked: boolean, html: string) => void;
}

export const useEditor = (props: UseEditorProps): [EditorInstance, NodeData, string] => {
    const {onReadOnlyChecked, value, onChange, limit, editable = true} = props;
    const handleId = useHandleId();
    const data = useData();
    const editor = useBaseEditor({
        editable,
        extensions: [
            Document,
            Columns,
            TaskList,
            TaskItem.configure({
                nested: true,
                onReadOnlyChecked: (node, checked) => {
                    // get the dom from the editor and then find the node by block id
                    // let editorDom = editor.view.dom;
                    // console.log(node.attrs.blockId, editorDom);
                    // let nodeDom = editorDom.querySelector(`[data-blockid="${node.attrs.blockId}"]`);
                    // // change the data-checked attribute on the node to checked value
                    // nodeDom.setAttribute('data-checked', checked)
                    // // change the input checked value
                    // nodeDom.querySelector('input').setAttribute('checked', checked)
                    // // update the currentValueJSON by finding the node in the json string and replacing it with the new checked value
                    // const newValue = value.replace(`"blockId":"${node.attrs.blockId}","checked":${!checked}`, `"blockId":"${node.attrs.blockId}","checked":${checked}`)
                    // // update the editor value based off the updated array
                    // editor.value.commands.setContent(JSON.parse(newValue), false)
                    console.log(editor.getJSON());
                    return false;
                }
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
                onNodeChange: data.handleNodeChange,
                onShow: () => data.setHidden(false),
                onHide: () => data.setHidden(true),
            }),
            CodeBlockLowlight.configure({
                lowlight: createLowlight(common),
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
                placeholder: ({node}) => {
                    if(node.type.name === 'quoteCaption') {
                        return "{#请输入引用作者#}";
                    }
                    if(node.type.name === 'quote') {
                        return "{#请输入引用内容#}";
                    }
                    return "{#输入 / 快速插入#}";
                },
            }),
            SlashCommand,
            Focus,
            Figcaption,
            BlockquoteFigure,
            Dropcursor.configure({
                width: 2,
                class: '!bg-primary',
            }),
            ImageBlock,
            ImageUpload.configure({
                clientId: "test",
            }),
        ],
        immediatelyRender: true,
        content: value ? JSON.parse(value) : value,
        onUpdate: ({ editor }) => {
            onChange?.(JSON.stringify(editor.getJSON()));
        },
    }, [onChange]);
    return [editor, data, handleId];
}
