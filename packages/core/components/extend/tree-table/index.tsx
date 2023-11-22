import ATableTree, { Cell, Header, Headers, Row, Rows } from '../../plugin/table-tree';
import {FC, ReactNode, CSSProperties} from "react";
import isFunction from "lodash/isFunction";
import {Spin} from "@clover/core/components/extend/spin";

export interface ColumnsProps {
    key: string;
    style?: CSSProperties;
    label: ReactNode;
    width?: number | string;
    render?: (item: any) => ReactNode;
}

export interface TreeTableProps {
    columns: ColumnsProps[];
    data?: any[];
    emptyText?: string;
    rowKey?: string;
    loading?: boolean;
}

export const TreeTable:FC<TreeTableProps> = (props) => {
    const {
        columns = [],
        data = [],
        emptyText = "No data",
        rowKey = 'id',
        loading = false
    } = props;

    return <div className={"relative"}>
        <ATableTree>
            <Headers>
                { columns.map((col ) => <Header key={col.key} width={col.width} style={col.style}>{col.label}</Header>) }
            </Headers>
            { data.length === 0 && <div className={"py-4 text-center text-gray-400"}>{emptyText}</div> }
            <Rows
                items={data}
                render={(item: any) => (
                    <Row
                        items={item.children}
                        hasChildren={item.children?.length > 0}
                        // isDefaultExpanded
                    >
                        { columns.map((col) => <Cell className={"!py-1"} key={`${col.key}${item[rowKey]}`} singleLine style={col.style}>{isFunction(col.render) ? col.render(item) : item[col.key]}</Cell>) }
                    </Row>
                )}
            />
        </ATableTree>
        { loading ? <div className={"absolute top-0 right-0 bottom-0 left-0 flex justify-center items-center bg-white/60"}><Spin /></div> : null }
    </div>;
}
