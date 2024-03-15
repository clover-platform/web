/* eslint-disable react/prop-types */
import React, {Component, FC, PropsWithChildren, useEffect, useState} from 'react';

import Cell from './cell';
import Header from './header';
import Headers from './headers';
import { type ColumnWidth, TableTreeContext } from './internal/context';
import Row from './row';
import Rows from './rows';
import { cn } from "@atom-ui/core/lib/utils";

interface State {
    columnWidths: ColumnWidth[];
    expansion: string[];
}

export interface TableTreeProps extends PropsWithChildren{
    items?: any[];
    shouldExpandOnClick?: boolean;
    headers?: any[];
    columns?: any[];
    columnWidths?: ColumnWidth[];
    mainColumnForExpandCollapseLabel?: number;
    rowClassName?: string;
    onRowClick?: (id: string) => void;
    rowSelectedClassName?: string;
    rowDisabledClassName?: string;
    onExpandedChange?: (id: string, expanded: boolean) => void;
}

export const TableTree: FC<TableTreeProps> = (props) => {
    const {
        items,
        shouldExpandOnClick,
        headers,
        columns,
        columnWidths = [],
        mainColumnForExpandCollapseLabel,
        rowClassName,
        onRowClick = (id: string) => {},
        rowSelectedClassName,
        rowDisabledClassName,
        onExpandedChange = (id: string, expanded: boolean) => {},
    } = props;

    const [widths, setWidths] = useState<ColumnWidth[]>([]);

    useEffect(() => {
        setWidths(columnWidths);
    }, []);

    const setColumnWidth = (columnIndex: number, width: ColumnWidth) => {
        if (width === widths[columnIndex]) {
            return;
        }
        widths[columnIndex] = width;
        setWidths([...widths]);
    };

    const getColumnWidth = (columnIndex: any) => {
        return widths[columnIndex] || null;
    };

    const heads = headers && (
        <Headers>
            {(headers as any[]).map((header, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <Header key={index} columnIndex={index} width={columnWidths[index]}>
                    {header}
                </Header>
            ))}
        </Headers>
    );
    let rows: React.ReactNode = null;
    if (columns && items) {
        rows = (
            <Rows
                items={items}
                render={({ id, children, hasChildren, content, selected, disabled, expanded }: any) => {
                    return (
                        <Row
                            itemId={id}
                            items={children}
                            hasChildren={hasChildren}
                            shouldExpandOnClick={shouldExpandOnClick}
                            mainColumnForExpandCollapseLabel={
                                mainColumnForExpandCollapseLabel
                            }
                            className={cn(
                                selected && rowSelectedClassName,
                                rowClassName,
                                disabled && rowDisabledClassName,
                            )}
                            onClick={() => !disabled && onRowClick && onRowClick(id)}
                            isExpanded={Boolean(expanded)}
                            onExpand={() => onExpandedChange && onExpandedChange(id, true)}
                            onCollapse={() => onExpandedChange && onExpandedChange(id, false)}
                        >
                            {(columns as any[]).map((CellContent, index) => (
                                <Cell
                                    // eslint-disable-next-line react/no-array-index-key
                                    key={index}
                                    columnIndex={index}
                                    width={columnWidths[index]}
                                >
                                    <CellContent {...content} />
                                </Cell>
                            ))}
                        </Row>
                    );
                }}
            />
        );
    }
    return (
        <TableTreeContext.Provider
            value={{
                setColumnWidth,
                getColumnWidth,
            }}
        >
            <div role="treegrid" aria-readonly>
                {heads}
                {rows}
                {props.children}
            </div>
        </TableTreeContext.Provider>
    );
}

export default TableTree;
