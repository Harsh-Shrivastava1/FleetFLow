import { useState } from 'react';
import { Card } from '../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

const INITIAL_TRIPS = [
    { id: 1, type: "Trailer Truck", origin: "Mumbai", destination: "Delhi", status: "On Way" },
    { id: 2, type: "Mini Truck", origin: "Ahmedabad", destination: "Surat", status: "On Way" },
    { id: 3, type: "Van", origin: "Pune", destination: "Mumbai", status: "Idle" },
    { id: 4, type: "Trailer", origin: "Delhi", destination: "Jaipur", status: "On Way" }
];

const MOCK_VEHICLES = [
    { id: "v1", plate: "MH00AB1234", capacityKg: 5000, label: "MH00AB1234 (5000kg max)" },
    { id: "v2", plate: "DL01YZ5678", capacityKg: 500, label: "DL01YZ5678 (500kg max)" } // Intentionally small for testing validation
];

const MOCK_DRIVERS = [
    { id: "d1", name: "John Doe" },
    { id: "d2", name: "Alex Smith" }
];

export function TripDispatcherPage() {
    const [trips, setTrips] = useState(INITIAL_TRIPS);

    // Form state
    const [vehicleId, setVehicleId] = useState(MOCK_VEHICLES[0].id);
    const [driverId, setDriverId] = useState(MOCK_DRIVERS[0].id);
    const [weight, setWeight] = useState('');
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [estCost, setEstCost] = useState('');
    const [error, setError] = useState('');

    const handleDispatch = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const vehicle = MOCK_VEHICLES.find(v => v.id === vehicleId);
        if (!vehicle) return;

        const cargoWeight = parseFloat(weight);
        if (cargoWeight > vehicle.capacityKg) {
            setError(`Cargo weight (${cargoWeight}kg) exceeds vehicle capacity (${vehicle.capacityKg}kg).`);
            return;
        }

        const newTrip = {
            id: trips.length + 1,
            type: "Truck",
            origin: origin,
            destination: destination,
            status: "Preparing"
        };

        setTrips([...trips, newTrip]);
        // Reset
        setWeight(''); setOrigin(''); setDestination(''); setEstCost('');
        alert('Trip Dispatched successfully!');
    };

    const selectedVehicle = MOCK_VEHICLES.find(v => v.id === vehicleId);
    const isOverweight = selectedVehicle && weight && parseFloat(weight) > selectedVehicle.capacityKg;

    return (
        <div className="space-y-4 max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                <div className="space-y-1">
                    <h1 className="text-xl font-semibold tracking-tight text-gray-900">Trip Dispatcher</h1>
                    <p className="text-sm text-gray-500">Monitor active routes and assign new trips.</p>
                </div>
            </div>

            <Card className="rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-4">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader className="bg-gray-50">
                            <TableRow className="border-b border-gray-200 hover:bg-transparent">
                                <TableHead className="text-xs uppercase tracking-wide text-gray-500 py-3 px-6 h-auto">Trip No</TableHead>
                                <TableHead className="text-xs uppercase tracking-wide text-gray-500 py-3 px-6 h-auto">Fleet Type</TableHead>
                                <TableHead className="text-xs uppercase tracking-wide text-gray-500 py-3 px-6 h-auto">Origin</TableHead>
                                <TableHead className="text-xs uppercase tracking-wide text-gray-500 py-3 px-6 h-auto">Destination</TableHead>
                                <TableHead className="text-xs uppercase tracking-wide text-gray-500 py-3 px-6 h-auto">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {trips.map((trip) => (
                                <TableRow key={trip.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors group">
                                    <TableCell className="font-medium text-gray-500 px-6 py-3 text-sm">#{trip.id}</TableCell>
                                    <TableCell className="text-gray-900 font-medium px-6 py-3 text-sm">{trip.type}</TableCell>
                                    <TableCell className="text-gray-600 px-6 py-3 text-sm">{trip.origin}</TableCell>
                                    <TableCell className="text-gray-600 px-6 py-3 text-sm">{trip.destination}</TableCell>
                                    <TableCell className="px-6 py-3">
                                        <span
                                            className={`rounded-full px-2 py-0.5 text-xs font-medium ${trip.status === "On Way"
                                                ? "bg-blue-100 text-blue-700"
                                                : trip.status === "On Trip"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-gray-100 text-gray-600"
                                                }`}
                                        >
                                            {trip.status}
                                        </span>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </Card>

            <Card className="p-6 rounded-xl border border-gray-200 bg-white shadow-sm mt-4">
                <div>
                    <h2 className="text-lg font-semibold tracking-tight text-gray-900">Schedule New Trip</h2>
                </div>
                <div className="border-t my-4"></div>
                <form onSubmit={handleDispatch} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-700">Select Vehicle</Label>
                            <Select value={vehicleId} onValueChange={setVehicleId}>
                                <SelectTrigger autoFocus className="w-full h-10 border-gray-300 focus:ring-2 focus:ring-black focus:ring-offset-1 rounded-lg transition-all duration-150">
                                    <SelectValue placeholder="Select a vehicle" />
                                </SelectTrigger>
                                <SelectContent className="rounded-lg shadow-md border-gray-200">
                                    {MOCK_VEHICLES.map(v => (
                                        <SelectItem key={v.id} value={v.id} className="hover:bg-gray-100 transition-colors">{v.label}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-700">Select Driver</Label>
                            <Select value={driverId} onValueChange={setDriverId}>
                                <SelectTrigger className="w-full h-10 border-gray-300 focus:ring-2 focus:ring-black focus:ring-offset-1 rounded-lg transition-all duration-150">
                                    <SelectValue placeholder="Select a driver" />
                                </SelectTrigger>
                                <SelectContent className="rounded-lg shadow-md border-gray-200">
                                    {MOCK_DRIVERS.map(d => (
                                        <SelectItem key={d.id} value={d.id} className="hover:bg-gray-100 transition-colors">{d.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-700">Cargo Weight (kg)</Label>
                            <Input required type="number" placeholder="Enter weight" className="h-10 rounded-lg border-gray-300 focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-1 transition-all duration-150" value={weight} onChange={e => setWeight(e.target.value)} />
                            {isOverweight && <p className="text-red-500 text-xs mt-1">Cargo weight exceeds vehicle capacity ({selectedVehicle?.capacityKg}kg).</p>}
                        </div>

                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-700">Estimated Fuel Cost</Label>
                            <Input required type="number" placeholder="$0.00" className="h-10 rounded-lg border-gray-300 focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-1 transition-all duration-150" value={estCost} onChange={e => setEstCost(e.target.value)} />
                        </div>

                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-700">Origin Address</Label>
                            <Input required placeholder="Ex: Warehouse A" className="h-10 rounded-lg border-gray-300 focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-1 transition-all duration-150" value={origin} onChange={e => setOrigin(e.target.value)} />
                        </div>

                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-700">Destination</Label>
                            <Input required placeholder="Ex: Client Site B" className="h-10 rounded-lg border-gray-300 focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-1 transition-all duration-150" value={destination} onChange={e => setDestination(e.target.value)} />
                        </div>
                    </div>

                    {error && !isOverweight && <div className="p-3 bg-red-50 text-red-800 text-sm rounded-md border border-red-100">{error}</div>}

                    <div className="pt-2">
                        <Button type="submit" disabled={!!isOverweight} className="w-full py-2.5 rounded-lg font-medium bg-black text-white hover:bg-gray-900 focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-1 transition-all duration-150 active:scale-95 shadow-sm">Confirm & Dispatch Trip</Button>
                    </div>
                </form>
            </Card>
        </div>
    );
}
