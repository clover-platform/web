import styles from '../style.module.scss';
import "../editor.css";
import {FC} from "react";
import classNames from "classnames";
import {EditorContent} from "@tiptap/react";
import {useEditor} from "@/components/common/editor/hooks";

export type ContentViewerProps = {
    value?: string;
}

export const ContentViewer: FC<ContentViewerProps> = (props) => {
    const {value} = props;
    const [editor] = useEditor({
        value, editable: false,
    });

    return <div className={styles.editorContainer}>
        <EditorContent
            className={classNames(styles.editor, styles.readonly)}
            editor={editor}
        />
    </div>
}
