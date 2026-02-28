import React from 'react'
import { LayoutDashboard, MapPin, BarChart2, Settings, User, LogOut } from 'lucide-react'

const SidebarItem = ({ icon: Icon, active = false, label }) => (
    <div className="group relative flex items-center justify-center">
        <button className={`p-3 rounded-2xl transition-all duration-300 relative z-10 ${active
                ? 'bg-blue-500 text-white shadow-lg shadow-blue-200 scale-110'
                : 'text-slate-400 hover:text-blue-500 hover:bg-blue-50'
            }`}>
            <Icon size={22} />
        </button>
        {/* Tooltip */}
        <span className="absolute left-20 px-3 py-1 bg-slate-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl">
            {label}
        </span>
    </div>
)

const Sidebar = () => {
    return (
        <aside className="fixed left-6 top-1/2 -translate-y-1/2 h-[80vh] w-20 glass-card rounded-[2.5rem] flex flex-col items-center py-8 justify-between z-50">
            {/* Brand / Logo */}
            <div className="w-12 h-12 bg-gradient-to-tr from-blue-600 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200 mb-8">
                <div className="w-6 h-6 border-4 border-white rounded-full border-t-transparent animate-spin-slow" />
            </div>

            {/* Main Nav */}
            <nav className="flex flex-col gap-8 flex-1">
                <SidebarItem icon={LayoutDashboard} active label="Dashboard" />
                <SidebarItem icon={MapPin} label="Locations" />
                <SidebarItem icon={BarChart2} label="Analytics" />
            </nav>

            {/* Bottom Actions */}
            <div className="flex flex-col gap-6 mt-auto">
                <SidebarItem icon={Settings} label="Settings" />
                <div className="w-10 h-10 rounded-2xl overflow-hidden border-2 border-white shadow-md cursor-pointer hover:scale-105 transition-transform">
                    <img
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sibgha"
                        alt="User"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
        </aside>
    )
}

export default Sidebar
