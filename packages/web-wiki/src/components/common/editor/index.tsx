import styles from './style.module.scss';
import "./editor.css";
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import CharacterCount from '@tiptap/extension-character-count'
import { BubbleMenuControl } from './control/bubble-menu'
import { CharacterCountControl } from "@/components/common/editor/control/character-count";
import Placeholder from '@tiptap/extension-placeholder'
import Typography from '@tiptap/extension-typography'
import GlobalDragHandle from "@/components/common/editor/extension/global-drag-handle";
import SlashCommand from "@/components/common/editor/extension/slash-command";
import {DragHandleControl} from "@/components/common/editor/control/drag-handle";
import {useHandleId} from "@/components/common/editor/control/drag-handle/use.handle.id";
import {Node} from "@tiptap/pm/model";
import {useData} from "@/components/common/editor/control/drag-handle/use.data";

export const limit = 500;

export const Editor = () => {
    const handleId = useHandleId();
    const data = useData();

    const editor = useEditor({
        extensions: [
            StarterKit,
            CharacterCount.configure({
                limit,
            }),
            Placeholder.configure({
                placeholder: "{#输入 / 快速插入#}",
            }),
            Typography,
            GlobalDragHandle.configure({
                dragHandleSelector: `#${handleId}`,
                offsetTop: -48-16,
                onNodeChange: (node: Node, pos: number) => {
                    data.handleNodeChange({node, pos, editor: editor!});
                }
            }),
            SlashCommand,
        ],
        content: '<p>Hello World! 🌎️</p>' +
            '<ul>' +
            '   <li>asas</li>' +
            '   <li>asssssss</li>' +
            '</ul>'
    })

    return <div className={styles.editorContainer}>
        <BubbleMenuControl editor={editor!} />
        <EditorContent className={styles.editor} editor={editor} />
        <CharacterCountControl editor={editor!} limit={limit} />
        <DragHandleControl data={data} editor={editor!} id={handleId} />
    </div>
}
