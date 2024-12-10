'use client';

import {useLayoutConfig} from "@clover/public/components/layout/hooks/use.layout.config";
import {MainLayoutProps} from "@/components/layout/main";
import {FC, PropsWithChildren, useEffect, useState} from "react";
import {TabsTitle} from "@clover/public/components/common/tabs-title";
import {useRouter, useSearchParams} from "next/navigation";
import {HomeStart, StartItem} from "@/components/pages/home/start";
import {CreateBookModal} from "@/components/pages/home/create/modal";
import {getColumns, getFilters, getRowActions, getTabs} from "@/config/pages/book";
import {DataTable, useAlert, useMessage} from "@easykit/design";
import {useTableLoader} from "@clover/public/hooks";
import {deleteBook, list} from "@/rest/book";
import {Book} from "@/types/pages/book";
import { t } from '@clover/public/locale';
import {CreatePageModal} from "@/components/pages/home/create/page/modal";

export const SectionTitle: FC<PropsWithChildren> = (props) => {
    return <div className={"text-lg font-medium"}>
        { props.children }
    </div>
}

const initialParams = {
    keyword: '',
}

export const IndexPage = () => {
    useLayoutConfig<MainLayoutProps>({
        active: "wiki",
        path: [
            {
                title: t("文档"),
                type: "item",
            }
        ],
    })
    const router = useRouter();
    const search = useSearchParams();
    const type = search.get('type') || 'all';
    const [active, setActive] = useState(type);
    const [createVisible, setCreateVisible] = useState(false);
    const [loading, result, query, load] = useTableLoader<Book>({
        initialParams,
        action: list,
        keys: ['type'],
    });
    const alert = useAlert();
    const msg = useMessage();
    const [createPageVisible, setCreatePageVisible] = useState(false);

    const onStartClick = ({id}: StartItem) => {
        if(id === "new.book") {
            setCreateVisible(true);
        }else if(id === "new.file") {
            setCreatePageVisible(true);
        }
    }

    useEffect(() => {
        load({
            type: active,
            page: 1,
        }).then();
    }, [active]);

    return <div className={"space-y-4"}>
        <SectionTitle>{t("开始")}</SectionTitle>
        <HomeStart onClick={onStartClick} />
        <SectionTitle>{t("知识库")}</SectionTitle>
        <div>
            <TabsTitle
                active={active}
                items={getTabs()}
                onChange={setActive}
            />
            <DataTable<Book>
                filter={{
                    items: getFilters(),
                    defaultValues: initialParams,
                    query: query,
                }}
                load={load}
                pagination={{
                    total: result?.total || 0,
                    page: query.page,
                    size: query.size,
                }}
                columns={getColumns()}
                rowActions={getRowActions()}
                data={result?.data || []}
                loading={loading}
                onRowActionClick={({id: key}, {original}) => {
                    const {path} = original;
                    if(key === "detail") {
                        router.push(`/wiki/book/${path}`);
                    }else if(key === "setting") {
                        router.push(`/wiki/book/${path}/setting`);
                    }else if(key === "delete") {
                        alert.confirm({
                            title: t("删除"),
                            description: t("删除知识库后将无法恢复，确定删除？"),
                            onOk: async () => {
                                const { success, message } = await deleteBook(path);
                                if(success) {
                                    load().then();
                                }else{
                                    msg.error(message);
                                }
                            }
                        });
                    }
                }}
                onRowClick={(row) => {
                    const {path} = row.original;
                    router.push(`/wiki/book/${path}`);
                }}
            />
        </div>
        <CreateBookModal
            visible={createVisible}
            onCancel={() => setCreateVisible(false)}
            onSuccess={() => {
                setCreateVisible(false);
                load({type: 'create'}).then();
            }}
        />
        <CreatePageModal
            visible={createPageVisible}
            onCancel={() => setCreatePageVisible(false)}
            onSuccess={() => setCreatePageVisible(false)}
        />
    </div>
}
