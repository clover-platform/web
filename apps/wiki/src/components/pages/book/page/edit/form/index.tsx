import classNames from "classnames";
import {Button, Input, Separator, Skeleton, useMessage} from "@atom-ui/core";
import {i18n} from "@easy-kit/i18n/utils";
import {Action} from "@clover/public/components/common/action";
import {StarIcon} from "@radix-ui/react-icons";
import {Editor, EditorRef} from "@/components/common/editor";
import {FC, useCallback, useEffect, useMemo, useRef, useState} from "react";
import {detail, save} from "@/rest/page";
import {uuid} from "@easy-kit/common/utils";
import bus from "@easy-kit/common/events";
import {UPDATE_TITLE} from "@/events/book";
import {useRouter, useSearchParams} from "next/navigation";

export type PageEditFormProps = {
    pageId: string;
}

export const EditForm: FC<PageEditFormProps> = (props) => {
    const {pageId} = props;
    const search = useSearchParams();
    const id = search.get("id");
    const editorRef = useRef<EditorRef>(null);
    const [value, setValue] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const msg = useMessage();
    const [loading, setLoading] = useState<boolean>(false);
    const [pending, setPending] = useState<boolean>(false);
    const [editorKey, setEditorKey] = useState<string>(uuid());
    const router = useRouter();

    const load = useCallback(async () => {
        setLoading(true);
        const {success, message, data} = await detail(pageId);
        setLoading(false)
        if(success) {
            setValue(data?.content!);
            setTitle(data?.title!);
            setEditorKey(uuid());
        }else{
            msg.error(message);
        }
    }, [pageId])

    const size = useMemo(() => {
        return editorRef.current?.editor?.storage.characterCount.characters() || 0;
    }, [editorRef, value])

    useEffect(() => {
        pageId && load();
    }, [pageId, load])

    const submit = useCallback(async () => {
        setPending(true);
        const {success, message} = await save({
            id: Number(pageId),
            title,
            content: value
        });
        setPending(false);
        if(success) {
            bus.emit(UPDATE_TITLE, {
                id: Number(pageId),
                title
            });
            router.push(`/{#LANG#}/wiki/book/page/?id=${id}&page=${pageId}`);
        }else{
            msg.error(message);
        }
    }, [title, value, id, pageId]);

    return <div className={"space-y-4"}>
        <div className={"flex justify-center items-center sticky top-[48px] -m-4 px-4 py-2 border-b bg-white z-50"}>
            <div className={"flex-1 flex justify-start items-center space-x-2"}>
                <div className={"flex justify-center items-center space-x-1"}>
                    <div
                        className={classNames(
                            "w-6 h-6 rounded-full bg-[url(~@clover/public/assets/image/default/avatar.png)] bg-contain bg-center",
                        )}
                    />
                    <div className={"bg-green-500 h-2 w-2 rounded-full"}/>
                    <span>{"{#已连接#}"}</span>
                </div>
                <Separator orientation={"vertical"} className={"h-6"}/>
                <span>{i18n("{#%size 字#}", {size})}</span>
            </div>
            <div className={"flex space-x-2"}>
                <Action>
                    <StarIcon/>
                </Action>
                <Button
                    disabled={loading || pending}
                    onClick={submit}
                    loading={pending}
                >
                    {"{#保存#}"}
                </Button>
            </div>
        </div>
        <div className={"px-16 max-w-[860px] mx-auto"}>
            {
                loading ? <>
                    <div className={"py-4 pb-6"}>
                        <Skeleton className={"h-8 w-full"}/>
                    </div>
                    <div className={"space-y-4"}>
                        <div className={"space-y-2"}>
                            <Skeleton className={"h-6 w-full"}/>
                            <Skeleton className={"h-6 w-full"}/>
                            <Skeleton className={"h-6 w-6/12"}/>
                        </div>
                        <div className={"space-y-2"}>
                            <Skeleton className={"h-6 w-full"}/>
                            <Skeleton className={"h-6 w-full"}/>
                            <Skeleton className={"h-6 w-6/12"}/>
                        </div>
                    </div>
                </> : <>
                    <div className={"py-4 pb-6"}>
                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder={"{#请输入标题#}"}
                            className={"border-none p-0 m-0 h-auto rounded-none shadow-none focus-visible:ring-0 text-2xl"}
                        />
                    </div>
                    <Editor
                        key={editorKey}
                        ref={editorRef}
                        offsetTop={-48 - 53 - 68}
                        value={value}
                        onChange={setValue}
                    />
                </>
            }
        </div>
    </div>
}
