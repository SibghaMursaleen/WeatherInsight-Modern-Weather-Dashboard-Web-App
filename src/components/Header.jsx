import React, { useState, useEffect } from 'react'
import { Search, MapPin, Sun, Moon } from 'lucide-react'

const Header = ({ onSearch, onLocate }) => {
    const [time, setTime] = useState(new Date())
    const [search, setSearch] = useState('')
    const [userName, setUserName] = useState(() => localStorage.getItem('weather_user_name') || 'Sibgha')
    const [isEditing, setIsEditing] = useState(false)
    const [tempName, setTempName] = useState(userName)

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000)
        return () => clearInterval(timer)
    }, [])

    const handleNameSave = () => {
        const finalName = tempName.trim() || 'User'
        setUserName(finalName)
        localStorage.setItem('weather_user_name', finalName)
        setIsEditing(false)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (search.trim()) {
            onSearch(search.trim())
            setSearch('')
        }
    }

    const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    const formattedDate = time.toLocaleDateString('en-GB', {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    })

    return (
        <header className="flex flex-col xl:flex-row justify-between items-start xl:items-center py-4 mb-4 gap-6 w-full animate-in fade-in slide-in-from-top-4 duration-700">
            <div className="flex flex-col">
                <div className="flex items-center gap-3">
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight leading-none">
                        {formattedTime}
                    </h1>
                    <div className="h-6 w-[2px] bg-slate-200" />
                    <p className="text-base font-medium text-slate-500 uppercase tracking-wider">
                        {formattedDate}
                    </p>
                </div>
                <div className="flex items-center gap-2 mt-0.5 group/name">
                    <h2 className="text-lg font-medium text-slate-400">
                        Welcome back,{' '}
                        {isEditing ? (
                            <input
                                type="text"
                                value={tempName}
                                onChange={(e) => setTempName(e.target.value)}
                                onBlur={handleNameSave}
                                onKeyDown={(e) => e.key === 'Enter' && handleNameSave()}
                                className="bg-blue-50 border-b-2 border-blue-500 outline-none text-blue-600 font-bold px-1 w-32 animate-in zoom-in-95 duration-200"
                                autoFocus
                            />
                        ) : (
                            <span
                                onClick={() => { setTempName(userName); setIsEditing(true); }}
                                className="text-blue-600 font-bold cursor-pointer hover:underline decoration-blue-300 decoration-2 underline-offset-4 transition-all"
                                title="Click to change name"
                            >
                                {userName}
                            </span>
                        )}
                    </h2>
                </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-4 w-full xl:w-auto">
                {/* Search Bar */}
                <form onSubmit={handleSubmit} className="relative flex-1 md:w-[400px] w-full group">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                    <input
                        type="text"
                        placeholder="Search any city..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="input-sleek pl-14 pr-6 py-3.5 shadow-sm"
                    />
                </form>

                {/* Actions */}
                <div className="flex items-center gap-3 ml-2">
                    <button
                        onClick={onLocate}
                        title="Auto-detect location"
                        className="premium-button flex items-center gap-2 text-slate-600"
                    >
                        <MapPin size={18} className="text-blue-500" />
                        <span className="hidden sm:inline font-bold">Locate</span>
                    </button>
                </div>
            </div>
        </header>
    )
}

export default Header
