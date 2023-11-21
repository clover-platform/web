import TableTree from '../../plugin/table-tree';
import { FC, ReactNode, useMemo, useState } from "react";
import { cn } from "@clover/core/lib/utils";
import { Checkbox } from "@clover/core/components/extend/checkbox";
import './style.css';
import { findNodeById, handleCheckedChange, handleItem, unSelectedAllNotById } from "./utils";

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
}

export interface TreeProps {
    items: TreeItemProps[];
    border?: boolean;
    checkbox?: boolean;
    selectable?: boolean;
    onSelectedChange?: (selected: TreeItemProps[]) => void;
    onCheckedChange?: (nodes: TreeItemProps[]) => void;
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
                    indeterminate={node.indeterminate}
                    checked={node.disabled ? false: node.checked}
                    disabled={node.disabled}
                    onCheckedChange={(checked) => onCheckedChange(!!checked, node)}
                />
            </div>
        }
        <div>{data.label}</div>
    </div>;
};

export const Tree:FC<TreeProps> = (props) => {
    const {
        items = [],
        border = true,
        checkbox = false,
        selectable = true,
    } = props;

    const [itemsState, setItemsState] = useState(items);

    const treeNodes = useMemo(() => {
        return itemsState.map((item) => handleItem(item, null));
    }, [itemsState]);

    return <div
        className={cn(
            "tree",
            border && "border rounded shadow-sm p-1",
        )}
    >
        <TableTree
            columns={[(content: ContentData) => {
                return <Item
                    nodes={treeNodes}
                    data={content}
                    checkbox={checkbox}
                    onCheckedChange={(checked, node) => {
                        handleCheckedChange(node, checked);
                        setItemsState(treeNodes);
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
            }: null}
        />
    </div>
}
