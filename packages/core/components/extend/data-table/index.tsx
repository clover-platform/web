import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    SortingState,
    getSortedRowModel,
    VisibilityState,
} from "@tanstack/react-table"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../ui/table";
import {Button} from "@clover/core/components/extend/button";
import {ReactNode, useMemo, useState} from 'react';
import {
    Action, Dropdown, DropdownMenuItemProps, FilterItemProps, Filters, FiltersProps,
} from "@clover/core"
import {IconColumns} from "@arco-iconbox/react-clover";
import isFunction from "lodash/isFunction";
import {isString} from "lodash";

export interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, unknown>[];
    data: TData[];
    actions?: ReactNode;
    filters?: FilterItemProps[];
    defaultValues?: object;
}

export const DataTable = <TData, TValue>(props: DataTableProps<TData, TValue>) => {

    const {
        data,
        columns,
        actions,
        filters,
        ...rest
    } = props;
    const filtersProps: FiltersProps = {...rest, items: filters }

    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({})

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
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

    console.log(sorting);

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
            filters && filters.length ? <div className={"border-0 border-solid border-b border-secondary pb-2"}>
                <Filters {...filtersProps} />
            </div> : null
        }
        <div className="flex items-center my-2 justify-end">
            <Dropdown align={"end"} items={columnSettings}>
                <Action>
                    <IconColumns fontSize={18} />
                </Action>
            </Dropdown>
        </div>
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
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
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
            <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
            >
                Previous
            </Button>
            <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
            >
                Next
            </Button>
        </div>
    </>
}
