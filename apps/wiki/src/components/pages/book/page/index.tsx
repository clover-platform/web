'use client';

import {FC, useCallback, useMemo, useRef} from "react";
import {useLayoutConfig} from "@clover/public/components/layout/hooks/use.layout.config";
import {BookLayoutProps} from "@/components/layout/book";
import {PageDetail, PageProps} from "@/types/pages/page";
import {useMessage} from "@easykit/design";
import {AbortPromise} from "@easykit/common/utils/rest";
import {RestResult} from "@easykit/common/types/rest";
import {save} from "@/rest/page";
import classNames from "classnames";
import {i18n} from "@easykit/common/utils/locale";
import {CollectAction} from "@/components/pages/book/page/actions/collect";
import {Action} from "@clover/public/components/common/action";
import {Pencil1Icon} from "@radix-ui/react-icons";
import {ContentViewer} from "@/components/common/editor/viewer";
import { t } from '@easykit/common/utils/locale';
import {useLocaleCode} from "@easykit/common/hooks/use.locale";
import {useTimeAgo} from "@easykit/common/hooks/use.time.ago";
import {useRouter} from "next/navigation";

export type DetailPageProps = {
    detail: PageDetail
} & PageProps;

export const DetailPage: FC<DetailPageProps> = (props) => {
    const locale = useLocaleCode();
    const { detail } = props;
    const { bookId, pageId } = props.params;
    useLayoutConfig<BookLayoutProps>({
        path: [
            {
                title: t("知识库"),
                type: "link",
                href: `/${locale}/wiki/book/${bookId}/`,
            },
            {
                title: t("详情"),
                type: "item",
            }
        ],
    });
    const msg = useMessage();
    const saveHandler = useRef<AbortPromise<RestResult<any>>>();
    const timeAgo = useTimeAgo();
    const router = useRouter();

    const onChange = useCallback(async (json: string) => {
        saveHandler.current?.abort();
        saveHandler.current = save({
            bookId,
            id: pageId,
            title: detail?.title!,
            content: json,
            newVersion: false,
        });
        const res = await saveHandler.current;
        const {success, message} = res;
        if(!success && message !== "ERR_CANCELED") {
            msg.error(message);
        }
    }, [bookId, pageId, detail, saveHandler])

    const lastAuthor = useMemo(() => {
        const { userList, updateUser } = detail || {};
        const user = userList?.find(({userId}) => userId === updateUser);
        return user?.account;
    }, [detail])

    return <div className={"space-y-4"}>
        <div className={"flex justify-center items-center sticky top-[48px] -m-4 px-4 py-2 border-b bg-white z-50"}>
            <div className={"flex-1 flex justify-start items-center space-x-2"}>
                <div className={"flex justify-center items-center space-x-2"}>
                    <div
                        className={classNames(
                            "w-6 h-6 rounded-full bg-[url(~@clover/public/assets/image/default/avatar.png)] bg-contain bg-center",
                        )}
                    />
                    <div className={"text-secondary-foreground/70"}>
                        <div>
                            {
                                i18n(t("由 %author 最后更新于 %time"), {
                                    author: lastAuthor?.username,
                                    time: detail?.updateTime ? timeAgo.format(new Date(detail?.updateTime!)) : "--"
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className={"flex space-x-2"}>
                <CollectAction id={Number(pageId)} collected={detail?.collected!}/>
                <Action onClick={() =>{
                    router.push(`/${locale}/wiki/book/${bookId}/page/${pageId}/edit/`);
                    router.refresh();
                }}>
                    <Pencil1Icon/>
                </Action>
            </div>
        </div>
        <div className={"p-16 pt-4 max-w-[860px] mx-auto"}>
            <div className={"py-4 pb-6 text-2xl font-medium"}>
                {detail?.title}
            </div>
            <ContentViewer
                onChange={onChange}
                value={detail?.content}
            />
        </div>
    </div>
}
