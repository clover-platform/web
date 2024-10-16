'use client';

import {useLayoutConfig} from "@clover/public/components/layout/hooks/use.layout.config";
import {MainLayoutProps} from "@/components/layout/main";
import {FC, PropsWithChildren, useEffect, useState} from "react";
import {TabsTitle, TabsTitleItem} from "@clover/public/components/common/tabs-title";
import {useRouter, useSearchParams} from "next/navigation";
import {HomeStart, StartItem} from "@/components/pages/home/start";
import {CreateBookModal} from "@/components/pages/home/create/modal";
import {COLUMNS, FILTERS, ROW_ACTIONS} from "@/config/pages/book";
import {DataTable} from "@easykit/design";
import {useLocaleCode, useTableLoader} from "@easykit/common/hooks";
import {list} from "@/rest/book";
import {Book} from "@/types/pages/book";
import { t } from '@easykit/common/utils/locale';
import {useLocale} from "@easykit/common/hooks/use.locale";

export const SectionTitle: FC<PropsWithChildren> = (props) => {
    return <div className={"text-lg font-medium"}>
        { props.children }
    </div>
}

export const TABS: TabsTitleItem[] = [
    {
        id: "all",
        title: t("全部"),
    },
    {
        id: "create",
        title: t("由我创建"),
    },
    {
        id: "join",
        title: t("我加入的"),
    }
]

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
    const locale = useLocaleCode();

    const onStartClick = ({id}: StartItem) => {
        if(id === "new.book") {
            setCreateVisible(true);
        }
    }

    useEffect(() => {
        load({
            type: active,
            page: 1,
        }).then();
    }, [active]);

    return <div className={"flex justify-center"}>
        <div className={"container space-y-4"}>
            <SectionTitle>{t("开始")}</SectionTitle>
            <HomeStart onClick={onStartClick} />
            <SectionTitle>{t("知识库")}</SectionTitle>
            <div>
                <TabsTitle
                    active={active}
                    items={TABS}
                    onChange={setActive}
                />
                <DataTable<Book>
                    filter={{
                        items: FILTERS,
                        defaultValues: initialParams,
                        query: query,
                    }}
                    load={load}
                    pagination={{
                        total: result?.total || 0,
                        page: query.page,
                        size: query.size,
                    }}
                    columns={COLUMNS}
                    rowActions={ROW_ACTIONS}
                    data={result?.data || []}
                    loading={loading}
                    onRowActionClick={({id: key}, {original}) => {
                        const {id} = original;
                        if(key === "detail") {
                            router.push(`/${locale}/i18n/dashboard/?id=` + id);
                        }else if(key === "activity") {
                            router.push(`/${locale}/i18n/activity/?id=` + id);
                        }else if(key === "delete") {

                        }
                    }}
                    onRowClick={(row) => {
                        const {id} = row.original;
                        router.push(`/${locale}/wiki/book/` + id + "/");
                    }}
                />
            </div>
        </div>
        <CreateBookModal
            visible={createVisible}
            onCancel={() => setCreateVisible(false)}
            onSuccess={() => {
                setCreateVisible(false);
                load({type: 'create'}).then();
            }}
        />
    </div>
}
