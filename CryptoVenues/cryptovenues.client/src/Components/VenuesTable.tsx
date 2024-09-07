import { useState, useMemo, useEffect } from 'react';
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    ColumnDef,
    flexRender,
} from '@tanstack/react-table';

export interface Venue {
    id: string;
    name: string;
    category: string;
    longitude: number;
    latitude: number;
}

interface VenueTableProps {
    venues: Venue[];
    fetchData: (pageIndex: number, pageSize: number) => void;
    isLoading: boolean;
    selectedCategory: string
}

const VenueTable = ({ venues, fetchData, isLoading, selectedCategory }: VenueTableProps) => {
    const columns = useMemo<ColumnDef<Venue>[]>(() => [
        {
            accessorKey: 'id',
            header: 'ID',
        },
        {
            accessorKey: 'name',
            header: 'Name',
        },
        {
            accessorKey: 'category',
            header: 'Category',
        },
        {
            accessorKey: 'longitude',
            header: 'Longitude',
        },
        {
            accessorKey: 'latitude',
            header: 'Latitude',
        },
    ], []);

    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });

    const table = useReactTable({
        data: venues,
        columns,
        state: { pagination },
        manualPagination: true,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    useEffect(() => {
        fetchData(pagination.pageIndex, pagination.pageSize);
    }, [pagination.pageIndex]);

    useEffect(() => {
        table.setPageIndex(0)
        fetchData(pagination.pageIndex, pagination.pageSize);
    }, [pagination.pageSize, selectedCategory]);

    return (
        <>
            {isLoading ? <div className="loading-text">
                <p>Loading venues, please wait...</p>
            </div> : (<>
                <table>
                    <thead>
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <th key={header.id}>
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map(row => (
                            <tr key={row.id}>
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div>
                    <button
                        onClick={() => table.previousPage()}
                        disabled={pagination.pageIndex === 0}
                    >
                        {'<'}
                    </button>{' '}
                    <button
                        onClick={() => table.nextPage()}
                        disabled={table.getRowCount() < pagination.pageSize}
                    >
                        {'>'}
                    </button>{' '}
                    <span>
                        Page{' '}
                        <strong>
                            {table.getState().pagination.pageIndex + 1}
                        </strong>{' '}
                    </span>
                    <select
                        value={table.getState().pagination.pageSize}
                        onChange={e => {
                            table.setPageSize(Number(e.target.value));
                        }}
                    >
                        {[10, 20, 30, 40, 50].map(pageSize => (
                            <option key={pageSize} value={pageSize}>
                                Show {pageSize}
                            </option>
                        ))}
                    </select>
                </div>
            </>)}
        </>
    );
};

export default VenueTable;
