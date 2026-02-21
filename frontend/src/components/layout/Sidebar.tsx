import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Car,
    MapPin,
    Wrench,
    Receipt,
    TrendingUp,
    PieChart,
    Menu,
    ChevronRight
} from 'lucide-react';

const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Vehicle Registry', path: '/vehicles', icon: Car },
    { name: 'Trip Dispatcher', path: '/trips', icon: MapPin },
    { name: 'Maintenance', path: '#maintenance', icon: Wrench },
    { name: 'Trip & Expense', path: '#expenses', icon: Receipt },
    { name: 'Performance', path: '#performance', icon: TrendingUp },
    { name: 'Analytics', path: '#analytics', icon: PieChart },
];

export function Sidebar() {
    // Default to collapsed = true as per instructions
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [isHovered, setIsHovered] = useState(false);
    const location = useLocation();

    // If sidebar is pinned open or hovered, it's virtually expanded
    const isExpanded = !isCollapsed || isHovered;

    const handleLinkClick = () => {
        // Auto collapse on route change if it was pinned open
        setIsCollapsed(true);
    };

    return (
        <div
            className={`bg-white border-r border-gray-200 h-full flex flex-col shrink-0 transition-all duration-300 ease-in-out z-20 relative ${isExpanded ? 'w-64' : 'w-16'
                }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="h-16 flex items-center px-4 border-b border-gray-100 justify-between">
                <div className={`flex items-center gap-3 overflow-hidden ${isExpanded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-200`}>
                    <div className="w-8 h-8 bg-black rounded flex items-center justify-center shrink-0">
                        <span className="text-white font-bold text-sm">F</span>
                    </div>
                    <h2 className="text-xl font-semibold tracking-tight whitespace-nowrap">FleetFlow</h2>
                </div>

                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="p-1.5 hover:bg-gray-100 rounded-md text-gray-500 hover:text-black transition-colors shrink-0 absolute right-3"
                >
                    {isExpanded && !isCollapsed ? <ChevronRight className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
            </div>

            <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto overflow-x-hidden">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    const Icon = item.icon;
                    return (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            onClick={handleLinkClick}
                            className={`flex items-center px-2.5 py-2 text-sm font-medium rounded-md transition-colors ${isActive
                                    ? 'bg-gray-100 text-black font-semibold'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-black'
                                }`}
                            title={isCollapsed && !isHovered ? item.name : undefined}
                        >
                            <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-black' : 'text-gray-500'}`} />

                            <span className={`ml-3 whitespace-nowrap transition-opacity duration-200 ${isExpanded ? 'opacity-100' : 'opacity-0 hidden w-0'
                                }`}>
                                {item.name}
                            </span>
                        </NavLink>
                    );
                })}
            </nav>

            {/* Profile section logic removed from here as it will go to navbar, keeping minimal spacing */}
        </div>
    );
}
