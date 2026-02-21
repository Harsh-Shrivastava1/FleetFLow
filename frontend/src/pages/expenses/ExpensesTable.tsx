import { useState } from 'react';
import { useFleetStore } from '../../store/useFleetStore';
import type { Expense } from '../../types/models';
import { StatusBadge } from '../../components/shared/StatusBadge';
import { formatCurrency } from '../../utils/formatCurrency';
import { DataTable } from '../../components/shared/DataTable';
import { Combobox } from '../../components/ui/combobox';
import { ChevronDown, ChevronRight, DollarSign } from 'lucide-react';

interface ExpensesTableProps {
    vehicleFilter: string;
    onVehicleFilterChange: (val: string) => void;
    onCreateExpense: () => void;
}

export function ExpensesTable({ vehicleFilter, onVehicleFilterChange, onCreateExpense }: ExpensesTableProps) {
    const { expenses, vehicles } = useFleetStore();
    const [expandedRow, setExpandedRow] = useState<string | null>(null);

    const filteredExpenses = vehicleFilter === 'all'
        ? expenses
        : expenses.filter(e => e.vehicleId === vehicleFilter);

    return (
        <DataTable<Expense>
            data={filteredExpenses}
            rowKey={r => r.id}
            searchPlaceholder="Search by trip ID, vehicle, or driver..."
            searchKeys={['tripId', 'vehiclePlate', 'driverName']}
            onRowClick={r => setExpandedRow(expandedRow === r.id ? null : r.id)}
            expandedRow={expandedRow}
            renderExpanded={r => (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-1">
                    {[
                        ['Cost per KM', `₹${r.costPerKm.toFixed(2)}`],
                        ['Date', new Date(r.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })],
                        ['Fuel Efficiency', r.fuelLiters > 0 ? `${(r.distance / r.fuelLiters).toFixed(1)} km/L` : '—'],
                        ['Notes', r.notes || '—'],
                    ].map(([label, value]) => (
                        <div key={label}>
                            <p className="text-xs text-gray-400 uppercase tracking-wider">{label}</p>
                            <p className="text-sm font-medium text-gray-800 mt-1">{value}</p>
                        </div>
                    ))}
                </div>
            )}
            filterSlot={
                <Combobox
                    options={[{ value: 'all', label: 'All Vehicles' }, ...vehicles.map(v => ({ value: v.id, label: v.plate }))]}
                    value={vehicleFilter}
                    onValueChange={v => onVehicleFilterChange(v || 'all')}
                    placeholder="Filter by vehicle"
                    searchPlaceholder="Search vehicles..."
                    className="w-44"
                />
            }
            emptyState={
                <div className="flex flex-col items-center justify-center py-16 px-4">
                    <div className="h-14 w-14 rounded-lg bg-gray-100 flex items-center justify-center mb-4"><DollarSign className="h-7 w-7 text-gray-400" /></div>
                    <p className="text-sm text-gray-400 mb-2">No expenses recorded.</p>
                    <button onClick={onCreateExpense} className="px-4 py-2 text-sm font-medium rounded-lg bg-black text-white hover:bg-gray-800 transition-colors">Add Expense</button>
                </div>
            }
            columns={[
                { key: 'expand', header: '', className: 'w-8', render: r => expandedRow === r.id ? <ChevronDown className="h-4 w-4 text-gray-400" /> : <ChevronRight className="h-4 w-4 text-gray-400" /> },
                { key: 'trip', header: 'Trip ID', render: r => <span className="font-mono text-xs text-gray-500">{r.tripId}</span> },
                { key: 'vehicle', header: 'Vehicle', render: r => <span className="font-medium text-emerald-600">{r.vehiclePlate}</span> },
                { key: 'driver', header: 'Driver', render: r => <span>{r.driverName}</span> },
                { key: 'distance', header: 'Distance', render: r => <span className="text-gray-500">{r.distance} km</span> },
                { key: 'fuel', header: 'Fuel (L)', render: r => <span className="text-gray-500">{r.fuelLiters} L</span> },
                { key: 'fuelCost', header: 'Fuel Cost', render: r => <span>{formatCurrency(r.fuelCost)}</span> },
                { key: 'misc', header: 'Misc', render: r => <span>{formatCurrency(r.miscExpense)}</span> },
                { key: 'total', header: 'Total Cost', render: r => <span className="font-semibold">{formatCurrency(r.totalCost)}</span> },
                { key: 'status', header: 'Status', render: r => <StatusBadge status={r.status} /> },
            ]}
        />
    );
}
