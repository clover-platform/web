import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import CharacterCount from '@tiptap/extension-character-count'
import { BubbleMenuControl } from './control/bubble-menu'
import { CharacterCountControl } from "@/components/common/editor/control/character-count";
import Placeholder from '@tiptap/extension-placeholder'
import Typography from '@tiptap/extension-typography'
import styles from './style.module.scss';
import "./style.scss";
import GlobalDragHandle from 'tiptap-extension-global-drag-handle'
import AutoJoiner from 'tiptap-extension-auto-joiner'

export const limit = 500;

export const Editor = () => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            CharacterCount.configure({
                limit,
            }),
            Placeholder.configure({
                placeholder: 'Write something …',
            }),
            Typography,
            GlobalDragHandle,
            AutoJoiner,
        ],
        content: '<p>Hello World! 🌎️</p>' +
            '<ul>' +
            '   <li>asas</li>' +
            '   <li>asssssss</li>' +
            '</ul>'
    })

    return <div className={styles.editorContainer}>
        <BubbleMenuControl editor={editor} />
        <EditorContent className={styles.editor} editor={editor} />
        <CharacterCountControl editor={editor} limit={limit} />
    </div>
}
