import styles from '../style.module.scss';
import "../editor.css";
import {FC} from "react";
import classNames from "classnames";

export type ContentViewerProps = {
    value?: string;
}

export const ContentViewer: FC<ContentViewerProps> = (props) => {
    return <div className={styles.editorContainer}>
        <div className={classNames(styles.editor, styles.readonly)}>
            <div className={"tiptap ProseMirror"} dangerouslySetInnerHTML={{__html: props.value}}/>
        </div>
    </div>
}
