import { useState } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../components/ui/dialog';

const INITIAL_VEHICLES = [
    { id: 1, plate: "MH00AB1234", model: "Mini", type: "Truck", capacity: "5 ton", odometer: 70000, status: "Idle" },
    { id: 2, plate: "DL01YZ5678", model: "Maxi", type: "Trailer", capacity: "15 ton", odometer: 120500, status: "On Trip" },
];

export function VehicleRegistryPage() {
    const [vehicles, setVehicles] = useState(INITIAL_VEHICLES);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Form State
    const [plate, setPlate] = useState('');
    const [model, setModel] = useState('');
    const [type, setType] = useState('Truck');
    const [capacity, setCapacity] = useState('');
    const [odometer, setOdometer] = useState('');

    const handleSaveVehicle = (e: React.FormEvent) => {
        e.preventDefault();
        const newVehicle = {
            id: vehicles.length + 1,
            plate,
            model,
            type,
            capacity: `${capacity} ton`,
            odometer: parseInt(odometer) || 0,
            status: "Idle"
        };
        setVehicles([...vehicles, newVehicle]);
        setIsModalOpen(false);

        // Reset form
        setPlate(''); setModel(''); setType('Truck'); setCapacity(''); setOdometer('');
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">Vehicle Registry</h1>
                    <p className="text-sm text-gray-500">Manage your active fleet and asset details.</p>
                </div>
                <div className="flex gap-2">
                    <Button onClick={() => setIsModalOpen(true)}>+ New Vehicle</Button>
                </div>
            </div>

            <Card>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>No</TableHead>
                                <TableHead>Plate Num</TableHead>
                                <TableHead>Model</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Capacity</TableHead>
                                <TableHead>Odometer</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {vehicles.map((v) => (
                                <TableRow key={v.id}>
                                    <TableCell className="text-gray-500">{v.id}</TableCell>
                                    <TableCell className="font-medium">{v.plate}</TableCell>
                                    <TableCell>{v.model}</TableCell>
                                    <TableCell>{v.type}</TableCell>
                                    <TableCell>{v.capacity}</TableCell>
                                    <TableCell>{v.odometer.toLocaleString()} km</TableCell>
                                    <TableCell>
                                        <Badge variant={v.status === "Idle" ? "secondary" : (v.status === "On Trip" ? "success" : "warning")}>
                                            {v.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Button variant="ghost" className="h-8 px-2 text-xs">Edit</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {vehicles.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                                        No vehicles registered yet.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogHeader>
                    <DialogTitle>Register New Vehicle</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSaveVehicle}>
                    <DialogContent className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">License Plate</label>
                            <Input required placeholder="Ex: ABC-1234" value={plate} onChange={e => setPlate(e.target.value)} />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Type</label>
                                <select
                                    className="flex h-9 w-full rounded-md border border-gray-200 bg-white px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                                    value={type} onChange={e => setType(e.target.value)}
                                >
                                    <option value="Truck">Truck</option>
                                    <option value="Trailer Truck">Trailer Truck</option>
                                    <option value="Van">Van</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Model</label>
                                <Input required placeholder="Ex: Mini" value={model} onChange={e => setModel(e.target.value)} />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Max Payload (tons)</label>
                                <Input type="number" required placeholder="5" value={capacity} onChange={e => setCapacity(e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Initial Odometer</label>
                                <Input type="number" required placeholder="0" value={odometer} onChange={e => setOdometer(e.target.value)} />
                            </div>
                        </div>
                    </DialogContent>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                        <Button type="submit">Save Vehicle</Button>
                    </DialogFooter>
                </form>
            </Dialog>
        </div>
    );
}
