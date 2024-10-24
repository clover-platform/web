'use client';

import { useSearchParams } from "next/navigation";
import { useTableLoader } from "@easykit/common/hooks";
import { list } from "@/rest/member";
import { useEffect, useState } from "react";
import { TitleBar } from "@clover/public/components/common/title-bar";
import { DataTable } from "@easykit/design";
import { TabsTitle } from "@clover/public/components/common/tabs-title";
import { TABS } from "@/config/pages/member/tabs";
import { COLUMNS, FILTERS, ROW_ACTIONS } from "@/config/pages/member/table";
import { Member } from "@/types/pages/member";
import { InviteButton } from "@/components/pages/member/invite/button";
import {useLayoutConfig} from "@clover/public/components/layout/hooks/use.layout.config";
import {ModuleLayoutProps} from "@/components/layout/module";
import { t } from '@easykit/common/utils/locale';

const initialParams = {
    keyword: '',
}

export const MemberPage = () => {
    useLayoutConfig<ModuleLayoutProps>({
        active: "member",
        path: [
            {
                title: t("成员"),
                type: "item",
            }
        ],
    })
    const search = useSearchParams();
    const id = search.get('id');
    const type = search.get('type') || 'all';
    const [active, setActive] = useState(type);
    const [loading, result, query, load] = useTableLoader({
        initialParams: {
            ...initialParams,
            moduleId: id,
        },
        action: list,
        keys: ['type'],
    });

    useEffect(() => {
        load({
            type: active,
            page: 1,
        }).then();
    }, [active]);

    const actions = <div className={"space-x-2"}>
        <InviteButton />
    </div>

    return <>
        <TitleBar
            title={t("成员")}
            actions={actions}
            border={false}
        />
        <TabsTitle
            active={active}
            items={TABS}
            onChange={setActive}
        />
        <DataTable<Member>
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
            }}
        />
    </>
}
