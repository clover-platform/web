'use client';

import { TitleBar } from "@clover/public/components/common/title-bar";
import { DataTable, Space, useAlert, useMessage } from "@easykit/design";
import { getColumns, getFilters, ROW_ACTIONS } from "@/config/pages/module/branch/table";
import { useTableLoader } from "@easykit/common/hooks";
import { deleteBranch, list } from "@/rest/branch";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { NewBranchButton } from "@/components/pages/branch/new/button";
import { Branch } from "@/types/pages/branch";
import { RenameBranchModal } from "@/components/pages/branch/rename/modal";
import { MergeBranchModal } from "@/components/pages/branch/merge/modal";
import { useLayoutConfig } from "@clover/public/components/layout/hooks/use.layout.config";
import { ModuleLayoutProps } from "@/components/layout/module";
import { t } from '@easykit/common/utils/locale';

const initialParams = {
    keyword: '',
}

export const ModuleBranchPage = () => {
    useLayoutConfig<ModuleLayoutProps>({
        active: "branch",
        path: [
            {
                title: t("分支"),
                type: "item",
            }
        ],
    })
    const { module } = useParams();
    const [loading, result, query, load] = useTableLoader({
        initialParams: {
            ...initialParams,
            module: module,
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
            title={t("分支")}
            actions={actions}
            border={false}
        />
        <DataTable<Branch>
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
            rowActions={(cell) => ROW_ACTIONS(cell)}
            data={result?.data || []}
            loading={loading}
            onRowActionClick={({id: key}, {original}) => {
                if(key === "delete") {
                    alert.confirm({
                        title: t("删除分支"),
                        description: t("确认删除分支"),
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
