import React from 'react'
import { Cloud, Sun, CloudRain, CloudLightning, CloudSnow, CloudDrizzle } from 'lucide-react'

const weatherIcons = {
    Clear: Sun,
    Clouds: Cloud,
    Rain: CloudRain,
    Drizzle: CloudDrizzle,
    Thunderstorm: CloudLightning,
    Snow: CloudSnow,
}

const ForecastItem = ({ day, time, temp, condition, active = false }) => {
    const Icon = weatherIcons[condition] || Cloud

    return (
        <div className={`flex flex-col items-center justify-between p-5 rounded-[2rem] min-w-[120px] border transition-all duration-500 group cursor-pointer ${active
            ? 'bg-blue-600 text-white border-blue-500 shadow-xl shadow-blue-200/20 scale-105'
            : 'bg-white border-slate-50 hover:border-blue-100 hover:bg-slate-50/50 hover:-translate-y-1 shadow-sm'
            }`}>
            <span className={`text-[10px] font-black uppercase tracking-widest ${active ? 'text-white/80' : 'text-slate-400'}`}>
                {day || time}
            </span>

            <div className={`p-3 rounded-2xl my-3 transition-all duration-500 group-hover:scale-110 ${active ? 'bg-white/20' : 'bg-blue-50/50'
                }`}>
                <Icon size={28} strokeWidth={1.5} className={active ? 'text-white' : 'text-blue-500'} />
            </div>

            <div className="flex flex-col items-center">
                <span className={`text-xl font-black ${active ? 'text-white' : 'text-slate-800'}`}>
                    {Math.round(temp)}°
                </span>
                <span className={`text-[9px] font-bold uppercase tracking-wider mt-0.5 ${active ? 'text-white/60' : 'text-slate-400'}`}>
                    {condition}
                </span>
            </div>
        </div>
    )
}

const ForecastCard = ({ data = [] }) => {
    if (!data || data.length === 0) {
        return (
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                    <div key={i} className="bg-slate-50 rounded-[2rem] min-w-[130px] h-48 animate-pulse" />
                ))}
            </div>
        )
    }

    return (
        <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide p-2 -m-2 scroll-smooth">
            {data.map((item, index) => (
                <ForecastItem key={index} {...item} />
            ))}
        </div>
    )
}

export default ForecastCard
