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
    { name: 'Maintenance', path: '/maintenance', icon: Wrench },
    { name: 'Trip & Expense', path: '/expenses', icon: Receipt },
    { name: 'Performance', path: '/drivers', icon: TrendingUp },
    { name: 'Analytics', path: '/analytics', icon: PieChart },
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
            className={`bg-card border-r border-border h-full flex flex-col shrink-0 transition-all duration-300 ease-in-out z-20 relative ${isExpanded ? 'w-64' : 'w-16'
                }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="h-16 flex items-center px-4 border-b border-border justify-between">
                <div className={`flex items-center gap-3 overflow-hidden ${isExpanded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-200`}>
                    <h2 className="text-xl font-semibold tracking-tight whitespace-nowrap text-foreground">FleetFlow</h2>
                </div>

                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="p-1.5 hover:bg-muted rounded-lg text-muted-foreground hover:text-foreground transition-all shrink-0 absolute right-3"
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
                            className={`flex items-center px-2.5 py-2 text-sm font-medium rounded-lg transition-all ${isActive
                                ? 'bg-muted text-foreground font-semibold'
                                : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                                }`}
                            title={isCollapsed && !isHovered ? item.name : undefined}
                        >
                            <Icon className={`w-5 h-5 shrink-0 transition-colors ${isActive ? 'text-foreground' : 'text-muted-foreground'}`} />

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
