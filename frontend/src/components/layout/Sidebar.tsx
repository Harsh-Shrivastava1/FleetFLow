import { Link, useLocation } from 'react-router-dom';

const navItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Vehicle Registry', path: '/vehicles' },
    { name: 'Trip Dispatcher', path: '/trips' },
    { name: 'Maintenance', path: '#maintenance' },
    { name: 'Trip & Expense', path: '#expenses' },
    { name: 'Performance', path: '#performance' },
    { name: 'Analytics', path: '#analytics' },
];

export function Sidebar() {
    const location = useLocation();

    return (
        <div className="w-64 bg-white border-r border-gray-200 h-full flex flex-col shrink-0">
            <div className="h-16 flex items-center px-6 border-b border-gray-100">
                <h2 className="text-xl font-semibold tracking-tight">FleetFlow</h2>
            </div>
            <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.name}
                            to={item.path}
                            className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${isActive
                                    ? 'bg-gray-100 text-black font-semibold'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-black'
                                }`}
                        >
                            {item.name}
                        </Link>
                    );
                })}
            </nav>
            <div className="p-4 border-t border-gray-200">
                <div className="flex items-center gap-3 w-full p-2 hover:bg-gray-50 rounded-md cursor-pointer transition-colors">
                    <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm font-medium">
                        M
                    </div>
                    <div className="flex flex-col flex-1 min-w-0">
                        <span className="text-sm font-medium truncate">Manager User</span>
                        <span className="text-xs text-gray-500 truncate">Manager</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
