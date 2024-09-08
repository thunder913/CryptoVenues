import { useState, useMemo, useEffect } from 'react';
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    ColumnDef,
    flexRender,
} from '@tanstack/react-table';
import { GET_CATEGORY_VENUES_QUERY } from '../queries';
import { useLazyQuery } from '@apollo/client';

export interface Venue {
    id: string;
    name: string;
    category: string;
    longitude: number;
    latitude: number;
}

interface VenueTableProps {
    selectedCategory: string
}

const VenueTable = ({ selectedCategory }: VenueTableProps) => {
    const [getCategoryVenues] = useLazyQuery(GET_CATEGORY_VENUES_QUERY);
    const [venues, setVenues] = useState<Venue[]>([]);
    const [isFetching, setIsFetching] = useState<boolean>(false)

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

    const fetchData = async (pageIndex: number, pageSize: number) => {
        setIsFetching(true)
        try {
            const { data } = await getCategoryVenues({
                variables: {
                    category: selectedCategory,
                    limit: pageSize,
                    offset: pageIndex * pageSize,
                },
            });

            if (data && data.venuesByCategory) {
                setVenues(data.venuesByCategory);
            }
        } catch (error) {
            console.error('Error fetching venues:', error);
        }
        setIsFetching(false)
    };

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
            {isFetching ? <div className="loading-text">
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
