import {FC, ReactNode, useCallback, useEffect, useMemo, useState} from "react";
import {catalog} from "@/rest/page";
import {useSearchParams} from "next/navigation";
import {Catalog} from "@/types/pages/book";
import {AddPageAction} from "@/components/layout/book/add-page-action";
import {TreeData, Tree} from "@/components/common/tree";

const toTreeItemProps = (data: Catalog[]): TreeData[] => {
    return data.map(item => {
        return {
            key: `${item.id}`,
            title: item.title,
            children: toTreeItemProps(item.children)
        }
    });
}

export const CatalogTree = () => {
    const search = useSearchParams();
    const id = search.get("id");
    const [data, setData] = useState<Catalog[]>([]);

    const load = useCallback(async () => {
        const { success, data } = await catalog({
            bookId: Number(id)
        });
        if(success) {
            setData(data!);
        }else{
            setData([]);
        }
    }, []);

    useEffect(() => {
        load().then();
    }, [load]);

    const treeData = useMemo<TreeData[]>(() => {
        return toTreeItemProps(data);
    }, [data])

    return <Tree
        prefixCls={"rc-tree"}
        treeData={treeData}
        draggable={true}
        selectable={false}
        onDrop={(info) => {
            console.log(info);
        }}
    />
}
