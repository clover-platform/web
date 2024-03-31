'use client';

import { TitleBar } from "@clover/public/components/common/title-bar";
import {Button, DataTable, Space, useAlert, useMessage} from "@atom-ui/core";
import Link from "next/link";
import { useTableLoader } from "@easy-kit/common/hooks";
import { COLUMNS, FILTERS, ROW_ACTIONS } from "@/config/pages/module/table";
import {deleteModule, list} from "@/rest/module";
import {useEffect, useState} from "react";
import {TabsTitle} from "@clover/public/components/common/tabs-title";
import {TABS} from "@/config/pages/module/tabs";
import { useRouter, useSearchParams } from "next/navigation";
import {Module} from "@/types/pages/module";
import {useProfile} from "@clover/public/hooks/account";

const initialParams = {
    keyword: '',
}

export const ModulePage = () => {
    const profile = useProfile();
    const router = useRouter();
    const search = useSearchParams();
    const type = search.get('type') || 'all';
    const [active, setActive] = useState(type);
    const [loading, result, query, load] = useTableLoader<Module>({
        initialParams,
        action: list,
        keys: ['type'],
    });
    const alert = useAlert();
    const msg = useMessage();

    useEffect(() => {
        load({type}).then();
    }, []);

    useEffect(() => {
        load({
            type: active,
            page: 1,
        }).then();
    }, [active]);

    const actions = <Space>
        <Link href={"/{#LANG#}/i18n/module/create/"}>
            <Button>{"{#新建#}"}</Button>
        </Link>
    </Space>;

    return <>
        <TitleBar
            title={"{#国际化#}"}
            actions={actions}
            border={false}
        />
        <TabsTitle
            active={active}
            items={TABS}
            onChange={setActive}
        />
        <DataTable<Module>
            showHeader={false}
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
            rowActions={(row) => ROW_ACTIONS(profile, row)}
            data={result?.data || []}
            loading={loading}
            onRowActionClick={({id: key}, {original}) => {
                const {id} = original;
                if(key === "detail") {
                    router.push("/{#LANG#}/i18n/dashboard/?id=" + id);
                }else if(key === "activity") {
                    router.push("/{#LANG#}/i18n/activity/?id=" + id);
                }else if(key === "delete") {
                    alert.confirm({
                        title: "{#删除#}",
                        description: "{#删除该翻译项目，所以的翻译数据将无法使用，是否继续？#}",
                        onOk: async () => {
                            const { success, message } = await deleteModule(id);
                            if(success) {
                                load().then();
                            }else{
                                msg.error(message);
                            }
                            return success;
                        }
                    })
                }
            }}
            onRowClick={(row) => {
                const {id} = row.original;
                router.push("/{#LANG#}/i18n/dashboard/?id=" + id);
            }}
        />
    </>
}
