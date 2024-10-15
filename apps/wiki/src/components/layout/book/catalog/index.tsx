import {useCallback, useEffect, useMemo, useRef, useState, forwardRef, useImperativeHandle} from "react";
import {catalog, changeCatalogParent} from "@/rest/page";
import {useParams} from "next/navigation";
import {Catalog} from "@/types/pages/book";
import {TreeData, Tree} from "@/components/common/tree";
import {cloneDeep} from "lodash";
import {
    updateItem,
    addChild,
    moveToAfter,
    moveToChild,
    toTreeItemProps,
    allParent,
    UpdateData,
    getAllExpandedKeys
} from "@/components/layout/book/catalog/utils";
import {useMessage} from "@easykit/design";
import bus from "@easy-kit/common/events";
import {ADD_PAGE, UPDATE_TITLE} from "@/events/book";
import uniq from 'lodash/uniq';
import concat from 'lodash/concat';

export type CatalogTreeProps = {
    onExpand?: (expandedKeys: string[], allKeys: string[]) => void;
}

export type CatalogTreeRef = {
    expand: () => void;
    collapse: () => void;
}

export const CatalogTree = forwardRef<CatalogTreeRef, CatalogTreeProps>((props, ref) => {
    const { onExpand } = props;
    const params = useParams();
    const {bookId, pageId} = params;
    const [data, setData] = useState<Catalog[]>([]);
    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
    const msg = useMessage();
    const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
    const expandedKeysRef = useRef<string[]>([]);

    const load = useCallback(async () => {
        const { success, data } = await catalog({
            bookId
        });
        if(success) {
            setData(data!);
        }else{
            setData([]);
        }
    }, [bookId]);

    useEffect(() => {
        load().then();
    }, [load]);

    const treeData = useMemo<TreeData[]>(() => {
        return toTreeItemProps(data);
    }, [data])

    const allExpandedKeys = useMemo(() => {
        return getAllExpandedKeys(treeData);
    }, [treeData]);

    const saveChange = useCallback(async (pageId: number, parentId: number|undefined) => {
        const {success, message} = await changeCatalogParent({
            bookId,
            id: pageId,
            parentId
        });
        if(!success) {
            msg.error(message);
            load().then();
        }
    }, [bookId]);

    const onAdd = useCallback((item: Catalog) => {
        const cloneData = cloneDeep(data);
        addChild(cloneData, item);
        setData(cloneData)
    }, [data]);

    const onUpdate = useCallback((ud: UpdateData) => {
        const cloneData = cloneDeep(data);
        updateItem(cloneData, ud);
        setData(cloneData);
    }, [data])

    useEffect(() => {
        bus.on(ADD_PAGE, onAdd);
        bus.on(UPDATE_TITLE, onUpdate);
        return () => {
            bus.off(ADD_PAGE, onAdd);
            bus.off(UPDATE_TITLE, onUpdate);
        }
    }, [onAdd, onUpdate]);

    useEffect(() => {
        expandedKeysRef.current = expandedKeys;
    }, [expandedKeys]);

    useEffect(() => {
        onExpand?.(expandedKeys, allExpandedKeys);
    }, [expandedKeys, allExpandedKeys, onExpand]);

    useEffect(() => {
        if(pageId) {
            setExpandedKeys(uniq(concat(expandedKeysRef.current, allParent(data, Number(pageId)))))
            setSelectedKeys([pageId]);
        }else{
            setSelectedKeys([]);
        }
    }, [pageId, data, expandedKeysRef]);

    useImperativeHandle(ref, () => ({
        expand: () => {
            setExpandedKeys(allExpandedKeys);
        },
        collapse: () => {
            setExpandedKeys([]);
        }
    }), [allExpandedKeys]);

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
                saveChange(Number(dragKey), parentId).then();
            }}
            expandedKeys={expandedKeys}
            onExpand={(expandedKeys) => setExpandedKeys(expandedKeys as string[])}
            selectedKeys={selectedKeys}
            onSelect={(selectedKeys, {selected}) => {
                if(selected) {
                    setSelectedKeys(selectedKeys as string[]);
                }
            }}
        />
    </div>
})
