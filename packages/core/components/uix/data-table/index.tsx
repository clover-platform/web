import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    SortingState,
    getSortedRowModel,
    VisibilityState, Row,
} from "@tanstack/react-table"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../ui/table";
import {ReactNode, useContext, useMemo, useState} from 'react';
import {
    Action,
    Checkbox, cn,
    Dropdown,
    DropdownMenuItemProps,
    FilterItemProps,
    Filters,
    FiltersProps, Pagination, PaginationProps,
    Separator,
    Space, Spin
} from "@atom-ui/core";
import {IconColumns} from "@arco-iconbox/react-clover";
import isFunction from "lodash/isFunction";
import isArray from "lodash/isArray";
import {isString} from "lodash";
import {DotsHorizontalIcon} from "@radix-ui/react-icons";
import "./style.css";
import { formatValue } from "@atom-ui/core/components/uix/value-formatter";
import {UIXContext} from "@atom-ui/core/components/uix/config-provider";

export interface StickyColumnProps {
    key: string;
    position: "left" | "right";
    size: number;
}

export type onRowActionClick = <TData>(item: DropdownMenuItemProps, row: Row<TData>) => void;

export type DataTableColumn<TData> = ColumnDef<TData, unknown> & {
    className?: string;
    formatters?: string[];
}

export interface DataTableProps<TData, TValue> {
    columns: DataTableColumn<TData>[];
    data: TData[];
    actions?: ReactNode;
    filters?: FilterItemProps[];
    showColumnVisibility?: boolean;
    stickyColumns?: StickyColumnProps[];
    checkbox?: boolean;
    rowActions?: DropdownMenuItemProps[] | ((cell: TData) => DropdownMenuItemProps[]);
    onRowActionClick?: onRowActionClick;
    loading?: boolean;
    load?: (params?: any) => Promise<any>;
    filter?: FiltersProps;
    pagination?: PaginationProps | boolean;
    cellFormatters?: Function [],
    empty?: string;
}

export const getSticky = (id: string, leftStickyColumns: StickyColumnProps[], rightStickyColumns: StickyColumnProps[]) => {
    const inLeft = !!leftStickyColumns.find(({key}) => (key === id));
    if(inLeft) {
        let offset = 0;
        let width = 0;
        let index = 0;
        for(let col of leftStickyColumns) {
            index ++;
            if(col.key === id) {
                width = col.size;
                break;
            }
            offset = offset + col.size;
        }
        return {
            width, offset, enable: true,
            position: "left",
            last: index === leftStickyColumns.length,
            first: false,
        }
    }
    const inRight = !!rightStickyColumns.find(({key}) => (key === id));
    if(inRight) {
        let offset = 0;
        let width = 0;
        let i = 0;
        for(let index = rightStickyColumns.length - 1; index >= 0; index --) {
            i ++;
            const col = rightStickyColumns[index];
            if(col.key === id) {
                width = col.size;
                break;
            }
            offset = offset + col.size;
        }
        return {
            width, offset, enable: true,
            position: "right",
            last: false,
            first: i === rightStickyColumns.length,
        }
    }
    return { enable: false };
}

const hasActions = (rowActions: DropdownMenuItemProps[] | ((cell: any) => DropdownMenuItemProps[])) => {
    if(isFunction(rowActions)) {
        return true;
    }else if (isArray(rowActions)) {
        return !!rowActions.length;
    }
    return false;
}

export const DataTable = <TData, TValue>(props: DataTableProps<TData, TValue>) => {
    const {
        data,
        columns,
        actions,
        showColumnVisibility = true,
        rowActions,
        checkbox = false,
        stickyColumns = [],
        onRowActionClick = () => {},
        filter,
        loading,
        pagination,
        load,
        cellFormatters = [],
    } = props;

    const config = useContext(UIXContext);
    const empty = props.empty || config.locale.DataTable.empty;

    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({});

    const tableColumns = useMemo<ColumnDef<TData, unknown>[]>(() => {
        const newColumns = [];
        if(checkbox) {
            newColumns.push({
                id: "select",
                enableSorting: false,
                enableHiding: false,
                header: ({ table }) => (
                    <div className="pr-2 flex justify-center items-center">
                        <Checkbox
                            checked={table.getIsAllPageRowsSelected()}
                            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                            aria-label="Select all"
                        />
                    </div>
                ),
                cell: ({ row }) => (
                    <div className="pr-2 flex justify-center items-center">
                        <Checkbox
                            checked={row.getIsSelected()}
                            onCheckedChange={(value) => row.toggleSelected(!!value)}
                            aria-label="Select row"
                        />
                    </div>
                ),
            },)
        }
        newColumns.push(...columns);
        if(hasActions(rowActions)) {
            newColumns.push({
                id: "actions",
                enableHiding: false,
                size: 50,
                enableResizing: false,
                cell: ({ row }) => {
                    let items = rowActions;
                    if(isFunction(rowActions)) {
                        items = rowActions(row.original);
                    }
                    return <div className="flex justify-end w-full">
                        <Dropdown
                            items={items as DropdownMenuItemProps[]}
                            onItemClick={(item) => onRowActionClick(item, row)}
                        >
                            <Action className={"w-6 h-6 p-0"}>
                                <DotsHorizontalIcon />
                            </Action>
                        </Dropdown>
                    </div>
                },
            },)
        }
        return newColumns;
    }, [columns, checkbox, rowActions, onRowActionClick])

    const table = useReactTable({
        data,
        columns: tableColumns,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnVisibility,
            rowSelection
        },
    });

    const leftStickyColumns = useMemo<StickyColumnProps[]>(() => {
        const columns = [];
        if(checkbox) {
            columns.push({
                key: "select",
                position: "left",
                size: 40,
            })
        }
        columns.push(...stickyColumns.filter(({position}) => (position === 'left')))
        return columns;
    }, [stickyColumns, checkbox]);

    const rightStickyColumns = useMemo<StickyColumnProps[]>(() => {
        const columns = [];
        columns.push(...stickyColumns.filter(({position}) => (position === 'right')));
        if(hasActions(rowActions)) {
            columns.push({
                key: "actions",
                position: "right",
                size: 40,
            })
        }
        return columns;
    }, [stickyColumns, rowActions]);

    const columnSettings = useMemo<DropdownMenuItemProps[]>(() => {
        return table
            .getAllColumns()
            .filter((column) => column.getCanHide())
            .map((column) => {
                const item = columns.find((col) => {
                    const key = col.id || col['accessorKey'];
                    return key === column.id;
                });
                let label = column.id;
                if(item) {
                    if(isFunction(item.header)) {
                        label = item.header({ table, column, header: table.getFlatHeaders().find((col) => col.id === column.id) });
                    }else if(isString(item.header)) {
                        label = item.header;
                    }
                }
                return {
                    id: column.id,
                    label,
                    type: "checkbox",
                    checked: column.getIsVisible(),
                    onCheckedChange: (item, value) => column.toggleVisibility(!!value)
                }
            });
    }, [columns, columnVisibility]);

    return <>
        {
            filter ? <div className={"border-0 border-solid border-b border-secondary pb-2"}>
                <Filters
                    {...filter}
                    loading={loading}
                    load={load}
                />
            </div> : null
        }
        <Space className="flex items-center my-2 justify-start">
            { actions }
            {
                showColumnVisibility && columnSettings.length ? <>
                    {
                        actions ?  <div className={"h-5 mx-1"}>
                            <Separator orientation={"vertical"} />
                        </div> : null
                    }
                    <Dropdown align={"start"} items={columnSettings}>
                        <Action className={"w-9 h-9"}>
                            <IconColumns fontSize={18} />
                        </Action>
                    </Dropdown>
                </> : null
            }
        </Space>
        <div className={"relative"}>
            <Table className={"data-table"}>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                const sticky = getSticky(header.column.id, leftStickyColumns, rightStickyColumns);
                                const content = header.isPlaceholder
                                    ? null
                                    : flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )
                                return (
                                    <TableHead
                                        className={cn(
                                            sticky.enable ? "sticky table-sticky-row" : null,
                                            sticky.last ? "table-sticky-row-last" : null,
                                            sticky.first ? "table-sticky-row-first" : null,
                                            header.column.columnDef['className']
                                        )}
                                        style={ sticky.enable ? {zIndex: 10, minWidth: sticky.width, [sticky.position]: sticky.offset} : null }
                                        key={header.id}>
                                        { sticky.enable ? <div className={"h-10 px-2 flex items-center inner"}>{content}</div> : content }
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                            >
                                {row.getVisibleCells().map((cell) => {
                                    const sticky = getSticky(cell.column.id, leftStickyColumns, rightStickyColumns);
                                    const ctx = cell.getContext();
                                    const render = ctx.renderValue;
                                    const formatters = cell.column.columnDef['formatters'] || [];
                                    ctx.renderValue = () => {
                                        if(!formatters.includes("defaultValue")) formatters.push('defaultValue');
                                        return formatValue(cellFormatters, formatters, render());
                                    }
                                    const content = flexRender(cell.column.columnDef.cell, ctx);
                                    return <TableCell
                                        key={cell.id}
                                        className={cn(
                                            sticky.enable ? "sticky table-sticky-row" : null,
                                            sticky.last ? "table-sticky-row-last" : null,
                                            sticky.first ? "table-sticky-row-first" : null,
                                        )}
                                        style={ sticky.enable ? {zIndex: 10,minWidth: sticky.width, [sticky.position]: sticky.offset} : null }
                                    >
                                        { sticky.enable ? <div className={"h-10 px-2 flex items-center inner"}>{content}</div> : content }
                                    </TableCell>;
                                })}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={tableColumns.length} className="h-24 text-center">
                                {empty}
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <div className="py-4">
                {
                    pagination && <Pagination
                        {...(pagination as PaginationProps)}
                        onChange={(page: number) => {
                            load && load({page}).then();
                        }}
                        onSizeChange={(size: number) => {
                            load && load({size, page: 1}).then();
                        }}
                    />
                }
            </div>
            { loading ? <div className={"absolute top-0 left-0 bottom-0 right-0 flex justify-center items-center bg-white/50"}><Spin /></div> : null }
        </div>
    </>
}