import {BubbleMenu} from "@tiptap/react";
import {BubbleMenuPluginProps} from "@tiptap/extension-bubble-menu";
import {FC} from "react";

export type BubbleMenuControlProps = {
    editor: BubbleMenuPluginProps['editor'] | null;
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
