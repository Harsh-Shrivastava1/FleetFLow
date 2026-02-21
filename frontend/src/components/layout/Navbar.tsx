export function Navbar() {
    return (
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0 z-10 sticky top-0">
            <div className="flex-1 max-w-md">
                <div className="relative">
                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                    <input
                        type="search"
                        placeholder="Search..."
                        className="w-full h-9 pl-9 pr-4 rounded-md border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black focus:bg-white transition-all"
                    />
                </div>
            </div>
            <div className="flex items-center gap-2">
                <button className="h-9 px-3 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-md hover:bg-gray-50 hover:text-black transition-colors focus:outline-none focus:ring-1 focus:ring-black">
                    Group By
                </button>
                <button className="h-9 px-3 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-md hover:bg-gray-50 hover:text-black transition-colors focus:outline-none focus:ring-1 focus:ring-black">
                    Filter
                </button>
                <button className="h-9 px-3 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-md hover:bg-gray-50 hover:text-black transition-colors focus:outline-none focus:ring-1 focus:ring-black">
                    Sort
                </button>
            </div>
        </header>
    );
}
