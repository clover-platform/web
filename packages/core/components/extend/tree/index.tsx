import TableTree from '@atlaskit/table-tree';
import {FC, ReactNode, useEffect, useRef} from "react";
import './style.css';
import {cn} from "@clover/core/lib/utils";
import {Checkbox} from "@clover/core/components/ui/checkbox";

type ContentData = {
    id: string,
    label: ReactNode,
    checked?: boolean,

};

interface ItemProps {
    data: ContentData;
    checkbox?: boolean,
    onCheckedChange?: (checked: boolean) => void;
}

const Item = (props: ItemProps) => {
    const {
        onCheckedChange,
        data,
        checkbox,
    } = props;

    const boxRef = useRef(null);

    return <div className={"flex justify-center items-center"}>
        {
            checkbox && <div className={"mx-1 flex justify-center items-center"}>
                <Checkbox onCheckedChange={onCheckedChange} />
            </div>
        }
        <div>{data.label}</div>
    </div>;
};

export interface TreeItemProps {
    id: string;
    content: ContentData;
    hasChildren?: boolean;
    children?: TreeItemProps[];
}

export interface TreeProps {
    items: TreeItemProps[];
    border?: boolean;
    checkbox?: boolean;
}

export const Tree:FC<TreeProps> = (props) => {
    const {
        items,
        border = true,
        checkbox = false,
    } = props;
    return <div className={cn(
        "tree",
        border && "border rounded shadow-sm px-1",
    )}>
        <TableTree
            columns={[
                (content: ContentData) => <Item
                    data={content}
                    checkbox={checkbox}
                    onCheckedChange={(checked) => {
                        console.log(content, checked);
                    }}
                />
            ]}
            headers={['']}
            columnWidths={['100%']}
            items={items}
        />
    </div>
}
