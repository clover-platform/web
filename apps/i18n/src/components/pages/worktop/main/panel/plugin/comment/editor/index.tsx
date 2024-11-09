import { MentionsEditor } from "@clover/public/components/common/editor/mentions";
import { Action } from "@clover/public/components/common/action";
import { IconSend } from "@arco-iconbox/react-clover";
import { useRef, useState } from "react";
import { Spin, useMessage } from "@easykit/design";
import { add } from "@/rest/entry.comment";
import { useRecoilValue } from "recoil";
import { currentEntryState, currentLanguageState, entriesState } from "@/state/worktop";
import classNames from "classnames";
import bus from '@easykit/common/events';
import { ENTRY_COMMENT_RELOAD } from "@/events/worktop";
import { t } from '@easykit/common/utils/locale';
import {useParams} from "next/navigation";

export const CommentEditor = () => {
    const [value, setValue] = useState<string>("");
    const editorRef = useRef<any>();
    const [loading, setLoading] = useState<boolean>(false);
    const msg = useMessage();
    const entries = useRecoilValue(entriesState);
    const current = useRecoilValue(currentEntryState);
    const entry = entries[current];
    const language = useRecoilValue(currentLanguageState);
    const { module } = useParams();

    const send = async () => {
        if(!value) {
            msg.error(t("请输入评论内容"));
            return;
        }
        setLoading(true);
        const { success, message } = await add({
            content: value,
            entryId: entry.id,
            language,
            module: module as string,
        });
        if(success) {
            setValue("");
            editorRef.current.reset();
            bus.emit(ENTRY_COMMENT_RELOAD);
        }else{
            msg.error(message);
        }
        setLoading(false);
    }

    return <div className={"border-t w-full relative"}>
        <MentionsEditor
            ref={editorRef}
            value={value}
            onChange={setValue}
        />
        <div className={"p-2 flex justify-end items-center"}>
            <Action disabled={loading} onClick={send}>
                <IconSend className={"text-lg"} />
            </Action>
        </div>
        {
            loading ? <div
                className={classNames(
                    "absolute top-0 left-0 right-0 bottom-0 bg-white/50",
                    "flex justify-center items-center",
                )}
            >
                <Spin />
            </div> : null
        }
    </div>
}
