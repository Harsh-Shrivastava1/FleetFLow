import { useState, useMemo, type ReactNode } from 'react';
import { Search } from 'lucide-react';

interface Column<T> {
    key: string;
    header: string;
    render: (row: T) => ReactNode;
    className?: string;
}

interface DataTableProps<T> {
    data: T[];
    columns: Column<T>[];
    searchPlaceholder?: string;
    searchKeys?: (keyof T)[];
    filterSlot?: ReactNode;
    emptyState?: ReactNode;
    rowKey: (row: T) => string;
    onRowClick?: (row: T) => void;
    expandedRow?: string | null;
    renderExpanded?: (row: T) => ReactNode;
}

export function DataTable<T>({
    data,
    columns,
    searchPlaceholder = 'Search...',
    searchKeys = [],
    filterSlot,
    emptyState,
    rowKey,
    onRowClick,
    expandedRow,
    renderExpanded,
}: DataTableProps<T>) {
    const [search, setSearch] = useState('');

    const filtered = useMemo(() => {
        if (!search || searchKeys.length === 0) return data;
        const q = search.toLowerCase();
        return data.filter(row =>
            searchKeys.some(key => {
                const val = row[key];
                return typeof val === 'string' && val.toLowerCase().includes(q);
            })
        );
    }, [data, search, searchKeys]);

    return (
        <div className="space-y-4">
            {/* Search + Filters */}
            <div className="rounded-xl border border-gray-200 bg-white p-4">
                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder={searchPlaceholder}
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="w-full h-9 pl-9 pr-4 rounded-lg border border-gray-300 bg-white text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-gray-400 transition-all"
                        />
                    </div>
                    {filterSlot}
                </div>
            </div>

            {/* Table */}
            <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
                {filtered.length === 0 ? (
                    emptyState || (
                        <div className="flex flex-col items-center justify-center py-16 px-4">
                            <p className="text-sm text-gray-400">No results found.</p>
                        </div>
                    )
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full caption-bottom text-sm">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    {columns.map(col => (
                                        <th key={col.key} className={`h-10 px-4 text-left align-middle font-medium text-gray-500 text-xs uppercase tracking-wider ${col.className || ''}`}>
                                            {col.header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map(row => {
                                    const key = rowKey(row);
                                    const isExpanded = expandedRow === key;
                                    return (
                                        <tr
                                            key={key}
                                            className={`border-b border-gray-100 transition-colors hover:bg-gray-50 ${onRowClick ? 'cursor-pointer' : ''}`}
                                            onClick={() => onRowClick?.(row)}
                                        >
                                            {columns.map(col => (
                                                <td key={col.key} className={`p-4 align-middle ${col.className || ''}`}>
                                                    {col.render(row)}
                                                </td>
                                            ))}
                                            {isExpanded && renderExpanded && (
                                                <td colSpan={columns.length} className="bg-gray-50 px-4 py-3">
                                                    {renderExpanded(row)}
                                                </td>
                                            )}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
