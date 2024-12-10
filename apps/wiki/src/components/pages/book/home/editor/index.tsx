import {Editor, EditorRef, ContentViewer} from "@easykit/editor";
import {FC, useCallback, useEffect, useRef, useState} from "react";
import {Button, useMessage} from "@easykit/design";
import { t } from "@clover/public/locale";
import {saveHomePage} from "@/rest/book";

export type HomeEditorProps = {
    value: string;
    onSuccess: (value: string) => void;
    editing: boolean;
    onCancel: () => void;
    path: string;
}

export const HomeEditor: FC<HomeEditorProps> = (props) => {
    const { editing, onSuccess, onCancel, path } = props;
    const editorRef = useRef<EditorRef>(null);
    const [value, setValue] = useState<string>(props.value);
    const [loading, setLoading] = useState(false);
    const msg = useMessage();

    useEffect(() => {
        if(editing) {
            setValue(props.value);
        }
    }, [props.value, editing])

    const submit = useCallback(async () => {
        setLoading(true);
        const { success, message } = await saveHomePage({
            path,
            content: value
        })
        setLoading(false);
        if(success) {
            onSuccess?.(value);
        }else{
            msg.error(message);
        }
    }, [value, path, onSuccess])

    return editing ? <div className={"border rounded-md"}>
        <div className={"p-4 ml-16"}>
            <Editor
                ref={editorRef}
                value={value}
                onChange={setValue}
            />
        </div>
        <div className={"px-4 py-2 border-t flex justify-end space-x-2"}>
            <Button onClick={onCancel} disabled={loading} variant={"outline"}>{t("取消")}</Button>
            <Button onClick={submit} loading={loading}>{t("保存")}</Button>
        </div>
    </div> : (value ? <div className={"ml-9 pl-4"}>
        <ContentViewer
            value={value}
        />
    </div> : null)
}
