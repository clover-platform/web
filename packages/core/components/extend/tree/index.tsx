import TableTree from '../../plugin/table-tree';
import {FC, forwardRef, ReactNode, useMemo, useState} from "react";
import { cn } from "@clover/core/lib/utils";
import { Checkbox } from "@clover/core/components/extend/checkbox";
import './style.css';
import {
    findNodeById,
    getAllExpanded,
    handleCheckedChange,
    handleItem,
    initExpanded,
    initSelected,
    unSelectedAllNotById,
    getAllChecked, initChecked
} from "./utils";
import {Spin} from "@clover/core/components/extend/spin";

type ContentData = {
    id: string,
    label: ReactNode,
};

interface ItemProps {
    data: ContentData;
    checkbox?: boolean,
    onCheckedChange?: (checked: boolean, node: TreeItemProps) => void;
    nodes?: TreeItemProps[];
}

export interface TreeItemProps {
    id: string;
    content: ContentData;
    hasChildren?: boolean;
    children?: TreeItemProps[];
    parent?: TreeItemProps;
    indeterminate?: boolean;
    checked?: boolean,
    selected?: boolean;
    disabled?: boolean;
    expanded?: boolean;
}

export interface TreeProps {
    items: TreeItemProps[];
    border?: boolean;
    checkbox?: boolean;
    selectable?: boolean;
    onSelectedChange?: (id:string, selected: TreeItemProps) => void;
    onCheckedChange?: (nodes: TreeItemProps[]) => void;
    onExpandedChange?: (expansion: string[]) => void;
    expanded?: string[];
    selected?: string;
    emptyText?: string;
    loading?: boolean;
    checked?: string[];
}

const Item = (props: ItemProps) => {
    const {
        onCheckedChange,
        data,
        checkbox,
        nodes = [],
    } = props;

    const node = findNodeById(nodes, data.id);

    return <div className={"flex justify-center items-center"}>
        {
            checkbox && <div className={"mx-1 flex justify-center items-center"}>
                <Checkbox
                    indeterminate={`${node.indeterminate}`}
                    checked={node.disabled ? false: node.checked}
                    disabled={node.disabled}
                    onCheckedChange={(checked) => onCheckedChange(!!checked, node)}
                />
            </div>
        }
        <div>{data.label}</div>
    </div>;
};

export const Tree:FC<TreeProps> = forwardRef((props, ref) => {
    const {
        items = [],
        border = true,
        checkbox = false,
        selectable = true,
        expanded = [],
        onExpandedChange = (expansion: string[]) => {},
        onSelectedChange = (id: string, selected: TreeItemProps) => {},
        onCheckedChange = (nodes: TreeItemProps[]) => {},
        selected,
        emptyText = "No data",
        loading = false,
        checked = [],
    } = props;

    const checkedValue = (checked||[]).map((id) => `${id}`);
    const [itemsState, setItemsState] = useState(initChecked(initSelected(initExpanded(items, expanded), selected), checkedValue));

    const treeNodes = useMemo(() => {
        return itemsState.map((item) => handleItem(item, null));
    }, [itemsState]);

    const checkedChange = () => {
        const checked = getAllChecked(treeNodes);
        onCheckedChange(checked);
    }

    return <div
        className={cn(
            "tree rounded overflow-hidden",
            border && "border rounded shadow-sm p-1",
        )}
    >
        {
            loading ? <div className={"flex justify-start items-center m-2"}>
                <Spin />
            </div> : <>
                { itemsState.length === 0 && <div className={"my-2 text-center text-secondary-foreground/50"}>{emptyText}</div> }
                <TableTree
                    columns={[(content: ContentData) => {
                        return <Item
                            nodes={treeNodes}
                            data={content}
                            checkbox={checkbox}
                            onCheckedChange={(checked, node) => {
                                handleCheckedChange(node, checked);
                                setItemsState(treeNodes);
                                checkedChange();
                            }}
                        />;
                    }]}
                    headers={['']}
                    columnWidths={['100%']}
                    items={treeNodes}
                    rowClassName={"hover:bg-muted/50 px-1"}
                    rowSelectedClassName={"!bg-muted"}
                    rowDisabledClassName={"opacity-30 cursor-not-allowed"}
                    onRowClick={(selectable && !checkbox) ? (id: string) => {
                        const node = findNodeById(treeNodes, id);
                        node.selected = !node.selected;
                        unSelectedAllNotById(treeNodes, id);
                        setItemsState(treeNodes);
                        if(node.selected) {
                            onSelectedChange && onSelectedChange(id, node);
                        }else{
                            onSelectedChange && onSelectedChange(null, null);
                        }
                    }: null}
                    onExpandedChange={(id: string, expanded: boolean) => {
                        const node = findNodeById(treeNodes, id);
                        node.expanded = expanded;
                        setItemsState(treeNodes);
                        const all = getAllExpanded(treeNodes);
                        onExpandedChange && onExpandedChange(all);
                    }}
                />
            </>
        }
    </div>
})
