import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { useNavigate } from 'react-router-dom';

const KPI_DATA = [
    { title: "Active Fleet", value: "220" },
    { title: "Maintenance Alerts", value: "180" },
    { title: "Utilization Rate", value: "75%" },
    { title: "Pending Cargo", value: "20" }
];

const RECENT_TRIPS = [
    { trip: "TRP-001", vehicle: "Truck-01", driver: "John Doe", status: "On Trip" },
    { trip: "TRP-002", vehicle: "Van-02", driver: "Alex", status: "Idle" }
];

export function DashboardPage() {
    const navigate = useNavigate();

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">Dashboard Overview</h1>
                    <p className="text-sm text-gray-500">Live operational status of your fleet.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={() => navigate('/vehicles')}>New Vehicle</Button>
                    <Button onClick={() => navigate('/trips')}>New Trip</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {KPI_DATA.map((kpi, idx) => (
                    <Card key={idx}>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-gray-500">{kpi.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{kpi.value}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Recent Trips</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Trip ID</TableHead>
                                <TableHead>Vehicle</TableHead>
                                <TableHead>Driver</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {RECENT_TRIPS.map((trip) => (
                                <TableRow key={trip.trip}>
                                    <TableCell className="font-medium">{trip.trip}</TableCell>
                                    <TableCell>{trip.vehicle}</TableCell>
                                    <TableCell>{trip.driver}</TableCell>
                                    <TableCell>
                                        <Badge variant={trip.status === "On Trip" ? "success" : "secondary"}>
                                            {trip.status}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
