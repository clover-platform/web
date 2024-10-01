import {useCallback, useEffect, useMemo, useState} from "react";
import {catalog} from "@/rest/page";
import {useRouter, useSearchParams} from "next/navigation";
import {Catalog} from "@/types/pages/book";
import {TreeData, Tree} from "@/components/common/tree";
import {cloneDeep} from "lodash";
import {moveToAfter, moveToChild, toTreeItemProps} from "@/components/layout/book/catalog/utils";

export const CatalogTree = () => {
    const search = useSearchParams();
    const id = search.get("id");
    const [data, setData] = useState<Catalog[]>([]);
    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
    const router = useRouter();

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

    const saveChange = useCallback((id: number, parentId: number|undefined) => {
        console.log(id, parentId);
    }, [])

    return <div className={"mx-2"}>
        <Tree
            prefixCls={"rc-tree"}
            treeData={treeData}
            draggable={true}
            selectable={true}
            onDrop={(info) => {
                const { dropToGap, node, dragNode, dropPosition } = info;
                const { key: dragKey } = dragNode;
                const { key } = node;
                const cloneData = cloneDeep(data);
                let parentId;
                if(dropToGap) { // 推动到目标节点后面
                    parentId = moveToAfter(cloneData, dragKey, key, dropPosition);
                }else{ // 添加为子元素
                    parentId = moveToChild(cloneData, dragKey, key);
                }
                setData(cloneData);
                saveChange(Number(dragKey), parentId)
            }}
            selectedKeys={selectedKeys}
            onSelect={(selectedKeys, {selected}) => {
                if(selected) {
                    setSelectedKeys(selectedKeys as string[]);
                }
            }}
        />
    </div>
}
