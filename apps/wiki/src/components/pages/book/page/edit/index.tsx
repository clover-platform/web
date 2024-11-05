'use client';

import {useLayoutConfig} from "@clover/public/components/layout/hooks/use.layout.config";
import {BookLayoutProps} from "@/components/layout/book";
import {useRouter} from "next/navigation";
import {i18n, t} from '@easykit/common/utils/locale';
import {PageDetail, PageProps} from "@/types/pages/page";
import {FC, useCallback, useEffect, useRef, useState} from "react";
import {Editor, EditorRef, EditorEvents} from "@easykit/editor";
import {Button, Input, Separator, useMessage} from "@easykit/design";
import {save} from "@/rest/page";
import bus from "@easykit/common/events";
import {UPDATE_TITLE} from "@/events/book";
import classNames from "classnames";
import {CollectAction} from "@/components/pages/book/page/actions/collect";

export type EditPageProps = {
    detail: PageDetail
} & PageProps;

export const EditPage: FC<EditPageProps> = (props) => {
    const { detail } = props;
    const { bookPath, pageId } = props.params;
    useLayoutConfig<BookLayoutProps>({
        path: [
            {
                title: t("知识库"),
                type: "link",
                href: `/wiki/book/${bookPath}`,
            },
            {
                title: t("编辑"),
                type: "item",
            }
        ],
    });
    const editorRef = useRef<EditorRef>(null);
    const [value, setValue] = useState<string>(detail?.content);
    const [title, setTitle] = useState<string>(detail?.title);
    const msg = useMessage();
    const [pending, setPending] = useState<boolean>(false);
    const router = useRouter();
    const [size, setSize] = useState<number>(0);

    useEffect(() => {
        setSize(editorRef.current?.editor?.storage.characterCount.characters() || 0);
    }, [editorRef, value]);

    const onCreate = useCallback(({editor}: EditorEvents['create']) => {
        setSize(editor?.storage.characterCount.characters() || 0);
    }, []);

    const submit = useCallback(async () => {
        setPending(true);
        const {success, message} = await save({
            bookPath,
            id: pageId!,
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
            router.push(`/wiki/book/${bookPath}/page/${pageId}`);
            router.refresh()
        }else{
            msg.error(message);
        }
    }, [title, value, bookPath, pageId]);

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
                    <span>{t("已连接")}</span>
                </div>
                <Separator orientation={"vertical"} className={"h-6"}/>
                <span>{i18n(t("%size 字"), {size})}</span>
            </div>
            <div className={"flex space-x-2"}>
                <CollectAction
                    collected={detail?.collected!}
                    id={Number(pageId)}
                />
                <Button
                    disabled={pending}
                    onClick={submit}
                    loading={pending}
                    className={"h-8"}
                >
                    {t("更新")}
                </Button>
            </div>
        </div>
        <div className={"p-16 pt-4 max-w-[860px] mx-auto"}>
            <div className={"py-4 pb-6"}>
                <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder={t("请输入标题")}
                    className={"border-none p-0 m-0 h-auto rounded-none shadow-none focus-visible:ring-0 text-2xl font-medium"}
                />
            </div>
            <Editor
                ref={editorRef}
                value={value}
                onChange={setValue}
                onCreate={onCreate}
            />
        </div>
    </div>
}
