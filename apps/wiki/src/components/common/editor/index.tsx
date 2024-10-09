import styles from './style.module.scss';
import "./editor.css";
import { EditorContent } from '@tiptap/react'
import {forwardRef, useRef, useImperativeHandle, useEffect, useState} from "react";
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
    const [offsetTop, setOffsetTop] = useState<number|undefined>();
    const [editor, data, handleId] = useEditor({
        offsetTop, limit, value, onChange,
    });

    useImperativeHandle(ref, () => ({
        editor,
    }), [editor]);

    useEffect(() => {
        const rect = menuContainerRef.current?.getBoundingClientRect();
        setOffsetTop(0-(rect?.top||0));
    }, []);

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
