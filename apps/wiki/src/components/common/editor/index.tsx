import styles from './style.module.scss';
import "./editor.css";
import { EditorContent } from '@tiptap/react'
import {forwardRef, useRef, useImperativeHandle} from "react";
import {EditorController} from "@/components/common/editor/control";
import {Editor as EditorInstance} from '@tiptap/core';
import {useEditor} from "@/components/common/editor/hooks";

export type EditorProps = {
    limit?: number;
    value?: string;
    onChange?: (value: string) => void;
}

export type EditorRef = {
    editor: EditorInstance | null;
}

export const Editor = forwardRef<EditorRef, EditorProps>((props, ref) => {
    const {
        limit,
        value, onChange,
    } = props;
    const menuContainerRef = useRef<HTMLDivElement>(null);
    const [editor, data, handleId] = useEditor({
        limit, value, onChange,
    });

    useImperativeHandle(ref, () => ({
        editor,
    }), [editor]);

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
});
