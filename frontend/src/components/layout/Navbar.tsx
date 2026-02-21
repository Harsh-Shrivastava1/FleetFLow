import { useNavigate } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';
import { Button } from '../ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';

export function Navbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;

    return (
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0 z-10 sticky top-0">
            <div className="flex-1 w-full mr-6">
                <div className="relative max-w-xl">
                    <svg className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                    <input
                        type="search"
                        placeholder="Search..."
                        className="w-full h-10 pl-10 pr-4 rounded-full border border-gray-200 bg-gray-100/50 hover:bg-gray-100 focus:bg-white text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-300 transition-all font-medium text-gray-900 placeholder:text-gray-500"
                    />
                </div>
            </div>
            <div className="flex items-center gap-4">

                <div className="hidden md:flex flex-1 items-center gap-2 mr-2">
                    <button className="h-9 px-3 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 hover:text-black transition-all shadow-sm focus:outline-none focus:ring-1 focus:ring-black">
                        Group By
                    </button>
                    <button className="h-9 px-3 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 hover:text-black transition-all shadow-sm focus:outline-none focus:ring-1 focus:ring-black">
                        Filter
                    </button>
                </div>

                <div className="flex items-center pl-6 border-l border-gray-200 ml-2">
                    {!user ? (
                        <Button
                            onClick={() => navigate('/login')}
                            className="h-9 px-4 rounded-lg font-medium bg-black text-white hover:bg-gray-900 transition-all focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-1"
                        >
                            Log In
                        </Button>
                    ) : (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="flex items-center gap-3 focus:outline-none rounded-lg p-1 hover:bg-gray-50 transition-colors focus-visible:ring-2 focus-visible:ring-black">
                                    <div className="flex flex-col text-right hidden lg:flex">
                                        <span className="text-sm font-medium text-gray-900 leading-none">{user?.email?.split('@')[0] || 'User'}</span>
                                        <span className="text-xs text-gray-500 mt-1">{user?.role || 'Guest'}</span>
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-600">
                                        <User className="w-4 h-4" />
                                    </div>
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56 mt-1">
                                <div className="flex flex-col space-y-1 p-2 px-3">
                                    <p className="text-sm font-medium leading-none text-gray-900">{user?.email?.split('@')[0] || 'User'}</p>
                                    <p className="text-xs leading-none text-gray-500 mt-1">{user?.email || ''}</p>
                                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mt-2">{user?.role || 'Guest'}</p>
                                </div>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    className="cursor-pointer text-red-600 focus:text-red-700 focus:bg-red-50 m-1 rounded-md"
                                    onClick={handleLogout}
                                >
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span className="font-medium">Log out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                </div>
            </div>
        </header>
    );
}
