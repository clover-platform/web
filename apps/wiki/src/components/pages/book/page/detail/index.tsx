import {FC, useCallback, useEffect, useRef, useState} from "react";
import classNames from "classnames";
import {Skeleton, useMessage, Button} from "@atom-ui/core";
import {Action} from "@clover/public/components/common/action";
import {Pencil1Icon, StarIcon} from "@radix-ui/react-icons";
import {detail, save} from "@/rest/page";
import {PageDetail} from "@/types/pages/page";
import {ContentViewer} from "@/components/common/editor/viewer";
import Link from "next/link";
import {useSearchParams} from "next/navigation";
import {AbortPromise} from "@easy-kit/common/utils/rest";
import {RestResult} from "@easy-kit/common/types/rest";

export type DetailProps = {
    pageId: string;
}

export const Detail: FC<DetailProps> = (props) => {
    const search = useSearchParams();
    const id = search.get("id");
    const {pageId} = props;
    const [data, setData] = useState<PageDetail>();
    const [loading, setLoading] = useState<boolean>(false);
    const msg = useMessage();
    const saveHandler = useRef<AbortPromise<RestResult<any>>>();

    const load = useCallback(async () => {
        setLoading(true);
        const {success, message, data} = await detail(id!, pageId);
        setLoading(false)
        if(success) {
            setData(data);
        }else{
            msg.error(message);
        }
    }, [pageId, id])

    useEffect(() => {
        pageId && load();
    }, [pageId, load])

    const onChange = useCallback(async (html: string) => {
        console.log(html);
        // saveHandler.current?.abort();
        // saveHandler.current = save({
        //     bookId: Number(id),
        //     id: Number(pageId),
        //     title: data?.title!,
        //     content: html,
        //     newVersion: false,
        // });
        // const res = await saveHandler.current;
        // const {success, message} = res;
        // if(!success && message !== "ERR_CANCELED") {
        //     msg.error(message);
        // }
    }, [id, pageId, data, saveHandler])

    return <div className={"space-y-4"}>
        <div className={"flex justify-center items-center sticky top-[48px] -m-4 px-4 py-2 border-b bg-white z-50"}>
            <div className={"flex-1 flex justify-start items-center space-x-2"}>
                <div className={"flex justify-center items-center space-x-2"}>
                    <div
                        className={classNames(
                            "w-6 h-6 rounded-full bg-[url(~@clover/public/assets/image/default/avatar.png)] bg-contain bg-center",
                        )}
                    />
                    <div className={"text-xs text-secondary-foreground/70"}>
                        <div>负责人：某某某</div>
                        <div>由 赖嘉铖 最后更新于 大约2小时以前</div>
                    </div>
                </div>
            </div>
            <div className={"flex space-x-2"}>
                <Action>
                    <StarIcon/>
                </Action>
                <Link href={`/{#LANG#}/wiki/book/page/edit/?id=${id}&page=${pageId}`}>
                    <Action>
                        <Pencil1Icon />
                    </Action>
                </Link>
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
                    <div className={"py-4 pb-6 text-2xl font-medium"}>
                        {data?.title}
                    </div>
                    <ContentViewer
                        onChange={onChange}
                        value={data?.content}
                    />
                </>
            }
        </div>
    </div>
}
