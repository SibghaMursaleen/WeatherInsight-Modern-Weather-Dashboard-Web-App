import React from 'react'
import { Sun, Moon, Cloud, CloudRain, CloudLightning, Wind, Droplets, MapPin } from 'lucide-react'

const weatherIcons = {
    Sunny: Sun,
    Clear: Sun,
    Clouds: Cloud,
    Cloudy: Cloud,
    Rain: CloudRain,
    Rainy: CloudRain,
    Thunderstorm: CloudLightning,
}

const WeatherCard = ({ city, temp, condition, wind, humidity, sunrise, sunset }) => {
    const isDay = () => {
        if (!sunrise || !sunset) return true
        const now = Date.now() / 1000
        return now >= sunrise && now < sunset
    }

    const dayTime = isDay()
    const Icon = (condition === 'Clear' || condition === 'Sunny') ? (dayTime ? Sun : Moon) : (weatherIcons[condition] || Cloud)

    const formatTime = (timestamp) => {
        if (!timestamp) return '--:--'
        return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        })
    }

    return (
        <div className="glass-card rounded-[2.5rem] p-5 h-full flex flex-col justify-between group overflow-hidden relative border-none shadow-premium transition-all duration-500">
            {/* Background Accent */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-100/30 rounded-full blur-3xl group-hover:bg-blue-200/40 transition-all duration-700" />

            <div className="relative z-10 flex flex-col h-full">
                {/* Header: City & Status */}
                <div className="flex justify-between items-start mb-2 group-hover:translate-x-1 transition-transform">
                    <div className="space-y-0.5">
                        <div className="flex items-center gap-2 text-slate-400 font-bold uppercase tracking-widest text-[9px]">
                            <MapPin size={9} className="text-blue-500" />
                            <span>Current Conditions</span>
                        </div>
                        <h2 className="text-xl font-black text-slate-800 tracking-tight leading-tight">{city || 'Loading...'}</h2>
                        <div className="inline-flex items-center px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full text-[9px] font-black uppercase tracking-wider">
                            {condition || 'Updating'}
                        </div>
                    </div>
                    <div className="p-2.5 bg-white rounded-2xl shadow-sm group-hover:scale-110 transition-all duration-500 border border-slate-50">
                        <Icon size={28} className="text-blue-500" strokeWidth={1.5} />
                    </div>
                </div>

                {/* Main Content Area - Grid for Stats */}
                <div className="flex-1 grid grid-cols-12 gap-4 items-center min-h-0 py-4">
                    <div className="col-span-12 md:col-span-7">
                        <div className="flex items-start group/temp">
                            <span className="text-[4.8rem] font-black text-slate-900 leading-none tracking-tighter transition-transform group-hover/temp:scale-105 duration-500 drop-shadow-sm">
                                {temp ?? '--'}
                            </span>
                            <span className="text-2xl font-black text-blue-500 mt-2 ml-1 drop-shadow-sm">°C</span>
                        </div>
                    </div>

                    {/* Live Sun Data Bar integrated within card */}
                    <div className="col-span-12 md:col-span-5 flex flex-col gap-2.5 bg-white/40 p-3 rounded-2xl border border-white/40 animate-in slide-in-from-right-4 duration-1000 shadow-sm">
                        <div className="flex items-center gap-2.5">
                            <div className="p-1.5 bg-orange-500/10 rounded-lg">
                                <Sun size={12} className="text-orange-500" />
                            </div>
                            <div>
                                <p className="text-[8px] font-black text-slate-400 uppercase tracking-tighter">Sunrise</p>
                                <p className="text-[11px] font-black text-slate-700 leading-none">{formatTime(sunrise)}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2.5">
                            <div className="p-1.5 bg-indigo-500/10 rounded-lg">
                                <Moon size={12} className="text-indigo-500" />
                            </div>
                            <div>
                                <p className="text-[8px] font-black text-slate-400 uppercase tracking-tighter">Sunset</p>
                                <p className="text-[11px] font-black text-slate-700 leading-none">{formatTime(sunset)}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom: Detailed Stats */}
                <div className="mt-auto grid grid-cols-2 gap-6 border-t border-slate-100/30 pt-4">
                    <div className="flex items-center gap-3 group/item">
                        <div className="p-2.5 bg-slate-100/50 rounded-xl group-hover/item:bg-blue-500/10 transition-all duration-300">
                            <Wind size={18} className="text-slate-400 group-hover/item:text-blue-500 transition-colors" />
                        </div>
                        <div>
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Wind</p>
                            <p className="text-sm font-black text-slate-800">{wind ?? 0} <span className="text-[10px] opacity-60 font-medium">km/h</span></p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 group/item">
                        <div className="p-2.5 bg-slate-100/50 rounded-xl group-hover/item:bg-blue-500/10 transition-all duration-300">
                            <Droplets size={18} className="text-slate-400 group-hover/item:text-blue-500 transition-colors" />
                        </div>
                        <div>
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Humidity</p>
                            <p className="text-sm font-black text-slate-800">{humidity ?? 0} <span className="text-[9px] opacity-60 font-medium">%</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WeatherCard
