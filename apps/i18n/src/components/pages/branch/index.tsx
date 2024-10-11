'use client';

import { TitleBar } from "@clover/public/components/common/title-bar";
import { DataTable, Space, useAlert, useMessage } from "@easykit/design";
import { COLUMNS, FILTERS, ROW_ACTIONS } from "@/config/pages/module/branch/table";
import { useTableLoader } from "@easy-kit/common/hooks";
import { deleteBranch, list } from "@/rest/branch";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { NewBranchButton } from "@/components/pages/branch/new/button";
import { Branch } from "@/types/pages/branch";
import { RenameBranchModal } from "@/components/pages/branch/rename/modal";
import {MergeBranchModal} from "@/components/pages/branch/merge/modal";
import {useLayoutConfig} from "@clover/public/components/layout/hooks/use.layout.config";
import {ModuleLayoutProps} from "@/components/layout/module";

const initialParams = {
    keyword: '',
}

export const ModuleBranchPage = () => {
    useLayoutConfig<ModuleLayoutProps>({
        active: "branch",
        path: [
            {
                title: "{#分支#}",
                type: "item",
            }
        ],
    })
    const search = useSearchParams();
    const id = search.get('id');
    const [loading, result, query, load] = useTableLoader({
        initialParams: {
            ...initialParams,
            moduleId: id,
        },
        action: list,
    });
    const alert = useAlert();
    const msg = useMessage();
    const [renameVisible, setRenameVisible] = useState(false);
    const [branch, setBranch] = useState<Branch | null>(null);
    const [mergeVisible, setMergeVisible] = useState(false);

    useEffect(() => {
        load().then();
    }, []);

    const actions = <Space>
        <NewBranchButton onSuccess={load} />
    </Space>;

    return <>
        <TitleBar
            title={"{#分支#}"}
            actions={actions}
            border={false}
        />
        <DataTable<Branch>
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
            rowActions={(cell) => ROW_ACTIONS(cell)}
            data={result?.data || []}
            loading={loading}
            onRowActionClick={({id: key}, {original}) => {
                if(key === "delete") {
                    alert.confirm({
                        title: "{#删除分支#}",
                        description: "{#确认删除分支#}",
                        onOk: async () => {
                            const { success, message } = await deleteBranch({
                                id: original.id,
                                moduleId: original.moduleId,
                            });
                            if(success) {
                                load().then();
                            }else{
                                msg.error(message);
                            }
                            return success;
                        }
                    });
                }else if(key === "rename") {
                    setBranch(original);
                    setRenameVisible(true);
                }else if(key === "merge") {
                    setBranch(original);
                    setMergeVisible(true);
                }
            }}
        />
        <RenameBranchModal
            visible={renameVisible}
            branch={branch!}
            onCancel={() => {
                setRenameVisible(false);
                setBranch(null);
            }}
            onSuccess={() => {
                setRenameVisible(false);
                setBranch(null);
                load().then();
            }}
        />
        <MergeBranchModal
            visible={mergeVisible}
            branch={branch!}
            onCancel={() => {
                setMergeVisible(false);
                setBranch(null);
            }}
            onSuccess={() => {
                setMergeVisible(false);
                setBranch(null);
                load().then();
            }}
        />
    </>
}
