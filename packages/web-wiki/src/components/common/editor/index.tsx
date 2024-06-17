import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import CharacterCount from '@tiptap/extension-character-count'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import { BubbleMenuControl } from './control/bubble-menu'
import {CharacterCountControl} from "@/components/common/editor/control/character-count";
import Placeholder from '@tiptap/extension-placeholder'
import Typography from '@tiptap/extension-typography'

export const limit = 500;

export const Editor = () => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Document,
            Paragraph,
            Text,
            CharacterCount.configure({
                limit,
            }),
            Placeholder.configure({
                placeholder: 'Write something …',
            }),
            Typography,
        ],
        content: '<p>Hello World! 🌎️</p>',
    })

    return <>
        <BubbleMenuControl editor={editor} />
        <EditorContent className={"[&>.ProseMirror-focused]:outline-none"} editor={editor} />
        <CharacterCountControl editor={editor} limit={limit} />
    </>
}
