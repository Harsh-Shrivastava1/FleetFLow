import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

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
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="space-y-6 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8"
        >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight text-gray-900">Dashboard Overview</h1>
                    <p className="text-sm text-gray-500 mt-1">Live operational status of your fleet.</p>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" className="rounded-lg h-10 px-4 font-medium focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-1 border-gray-200 hover:bg-gray-50" onClick={() => navigate('/vehicles')}>New Vehicle</Button>
                    <Button className="rounded-lg h-10 px-4 font-medium bg-black text-white hover:bg-gray-900 focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-1 transition-all" onClick={() => navigate('/trips')}>New Trip</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {KPI_DATA.map((kpi, idx) => (
                    <Card key={idx} className="border-gray-200 shadow-sm rounded-xl hover:shadow-md transition-all duration-200 hover:scale-[1.01] bg-white cursor-default">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-gray-500">{kpi.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold tracking-tight text-gray-900">{kpi.value}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card className="border-gray-200 shadow-sm rounded-xl overflow-hidden mt-6">
                <CardHeader className="border-b border-gray-100 bg-white">
                    <CardTitle className="text-lg font-semibold tracking-tight text-gray-900">Recent Trips</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader className="bg-gray-50">
                                <TableRow className="border-b border-gray-200 hover:bg-transparent">
                                    <TableHead className="font-medium text-gray-600">Trip ID</TableHead>
                                    <TableHead className="font-medium text-gray-600">Vehicle</TableHead>
                                    <TableHead className="font-medium text-gray-600">Driver</TableHead>
                                    <TableHead className="font-medium text-gray-600">Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {RECENT_TRIPS.map((trip) => (
                                    <TableRow key={trip.trip} className="border-b border-gray-100 hover:bg-gray-50 transition-colors group">
                                        <TableCell className="font-medium text-gray-900">{trip.trip}</TableCell>
                                        <TableCell className="text-gray-600">{trip.vehicle}</TableCell>
                                        <TableCell className="text-gray-600">{trip.driver}</TableCell>
                                        <TableCell>
                                            <Badge
                                                variant="outline"
                                                className={
                                                    trip.status === "On Trip"
                                                        ? "bg-green-100 text-green-700 border-none font-medium hover:bg-green-100 shadow-none px-2.5 py-0.5"
                                                        : "bg-gray-100 text-gray-700 border-none font-medium hover:bg-gray-100 shadow-none px-2.5 py-0.5"
                                                }
                                            >
                                                {trip.status}
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
