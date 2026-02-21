import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';

const INITIAL_TRIPS = [
    { id: 1, type: "Trailer Truck", origin: "Mumbai", destination: "Delhi", status: "On Way" },
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

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">Trip Dispatcher</h1>
                    <p className="text-sm text-gray-500">Monitor active routes and assign new trips.</p>
                </div>
            </div>

            <Card>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Trip No</TableHead>
                                <TableHead>Fleet Type</TableHead>
                                <TableHead>Origin</TableHead>
                                <TableHead>Destination</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {trips.map((trip) => (
                                <TableRow key={trip.id}>
                                    <TableCell className="font-medium text-gray-500">#{trip.id}</TableCell>
                                    <TableCell>{trip.type}</TableCell>
                                    <TableCell>{trip.origin}</TableCell>
                                    <TableCell>{trip.destination}</TableCell>
                                    <TableCell>
                                        <Badge variant={trip.status === "On Way" ? "success" : "secondary"}>
                                            {trip.status}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Schedule New Trip</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleDispatch} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Select Vehicle</label>
                                <select
                                    className="flex h-9 w-full rounded-md border border-gray-200 bg-white px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                                    value={vehicleId} onChange={e => setVehicleId(e.target.value)}
                                >
                                    {MOCK_VEHICLES.map(v => (
                                        <option key={v.id} value={v.id}>{v.label}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Select Driver</label>
                                <select
                                    className="flex h-9 w-full rounded-md border border-gray-200 bg-white px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                                    value={driverId} onChange={e => setDriverId(e.target.value)}
                                >
                                    {MOCK_DRIVERS.map(d => (
                                        <option key={d.id} value={d.id}>{d.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Cargo Weight (kg)</label>
                                <Input required type="number" placeholder="Enter weight" value={weight} onChange={e => setWeight(e.target.value)} />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Estimated Fuel Cost</label>
                                <Input required type="number" placeholder="$0.00" value={estCost} onChange={e => setEstCost(e.target.value)} />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Origin Address</label>
                                <Input required placeholder="Ex: Warehouse A" value={origin} onChange={e => setOrigin(e.target.value)} />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Destination</label>
                                <Input required placeholder="Ex: Client Site B" value={destination} onChange={e => setDestination(e.target.value)} />
                            </div>
                        </div>

                        {error && <div className="p-3 bg-red-50 text-red-800 text-sm rounded-md border border-red-100">{error}</div>}

                        <div className="flex justify-end pt-4 border-t border-gray-100">
                            <Button type="submit">Confirm & Dispatch Trip</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

        </div>
    );
}
