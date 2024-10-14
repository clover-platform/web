import classNames from "classnames";
import {Button, Input, Separator, Skeleton, useMessage} from "@easykit/design";
import {i18n} from "@easy-kit/i18n/utils";
import {Action} from "@clover/public/components/common/action";
import {StarIcon} from "@radix-ui/react-icons";
import {Editor, EditorRef} from "@/components/common/editor";
import {FC, useCallback, useEffect, useRef, useState} from "react";
import {detail, save} from "@/rest/page";
import {uuid} from "@easy-kit/common/utils";
import bus from "@easy-kit/common/events";
import {UPDATE_TITLE} from "@/events/book";
import {useRouter, useSearchParams} from "next/navigation";
import {CollectAction} from "@/components/pages/book/page/actions/collect";
import {PageDetail} from "@/types/pages/page";

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
    const [size, setSize] = useState<number>(0);
    const [data, setData] = useState<PageDetail>();

    const load = useCallback(async () => {
        setLoading(true);
        const {success, message, data} = await detail(id!, pageId);
        setLoading(false)
        if(success) {
            setData(data);
            setValue(data?.content!);
            setTitle(data?.title!);
            setEditorKey(uuid());
        }else{
            msg.error(message);
        }
    }, [id, pageId])

    useEffect(() => {
        setSize(editorRef.current?.editor?.storage.characterCount.characters() || 0);
    }, [editorRef, value]);

    useEffect(() => {
        pageId && load();
    }, [pageId, load])

    const submit = useCallback(async () => {
        setPending(true);
        const {success, message} = await save({
            bookId: Number(id),
            id: Number(pageId),
            title,
            content: value,
            newVersion: true,
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
                {
                    loading ? <Skeleton className={"w-20 h-5"}/> : <span>{i18n("{#%size 字#}", {size: loading ? "--" : size})}</span>
                }
            </div>
            <div className={"flex space-x-2"}>
                <CollectAction
                    collected={data?.collected}
                    id={Number(pageId)}
                />
                <Button
                    disabled={loading || pending}
                    onClick={submit}
                    loading={pending}
                    className={"h-8"}
                >
                    {"{#更新#}"}
                </Button>
            </div>
        </div>
        <div className={"p-16 pt-4 max-w-[860px] mx-auto"}>
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
                            className={"border-none p-0 m-0 h-auto rounded-none shadow-none focus-visible:ring-0 text-2xl font-medium"}
                        />
                    </div>
                    <Editor
                        key={editorKey}
                        ref={editorRef}
                        value={value}
                        onChange={setValue}
                    />
                </>
            }
        </div>
    </div>
}
