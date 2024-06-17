import {BubbleMenu} from "@tiptap/react";
import {Editor} from '@tiptap/core'
import {FC} from "react";

export type BubbleMenuControlProps = {
    editor: Editor | null;
}

export const BubbleMenuControl: FC<BubbleMenuControlProps> = (props) => {
    const { editor } = props;
    if(!editor) return null;
    return <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
        <div className="bubble-menu">
            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={editor.isActive('bold') ? 'is-active' : ''}
            >
                Bold
            </button>
            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={editor.isActive('italic') ? 'is-active' : ''}
            >
                Italic
            </button>
            <button
                onClick={() => editor.chain().focus().toggleStrike().run()}
                className={editor.isActive('strike') ? 'is-active' : ''}
            >
                Strike
            </button>
        </div>
    </BubbleMenu>
}
