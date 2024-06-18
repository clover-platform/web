import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import CharacterCount from '@tiptap/extension-character-count'
import { BubbleMenuControl } from './control/bubble-menu'
import { CharacterCountControl } from "@/components/common/editor/control/character-count";
import Placeholder from '@tiptap/extension-placeholder'
import Typography from '@tiptap/extension-typography'
import styles from './style.module.scss';
import GlobalDragHandle from "@/components/common/editor/extension/global-drag-handle";
import {Action} from "@clover/public/components/common/action";
import {HamburgerMenuIcon, PlusIcon} from "@radix-ui/react-icons";
import "./editor.css";

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
            GlobalDragHandle.configure({
                dragHandleSelector: '#drag-handle',
                offsetTop: -48-16
            }),
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
        <div id={"drag-handle"} className={"absolute bg-black !left-0"}>
            <div className={"absolute right-2 top-0 space-x-2 flex"}>
                <Action className={"w-6 h-6 !p-0"}>
                    <PlusIcon />
                </Action>
                <Action className={"w-6 h-6 !p-0"}>
                    <HamburgerMenuIcon />
                </Action>
            </div>
        </div>
    </div>
}
