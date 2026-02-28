import React from 'react'
import { Wind, MapPin } from 'lucide-react'

const MetricItem = ({ label, value, unit, color, percentage }) => (
    <div className="flex flex-col items-center justify-center p-2 group/metric">
        <span className="text-xl font-black text-slate-800 group-hover/metric:text-blue-500 transition-colors uppercase tracking-tight">
            {value}
        </span>
        <div className="flex flex-col items-center">
            <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider leading-tight">{label}</span>
            <span className="text-[8px] text-slate-300 font-bold leading-tight">{unit}</span>
        </div>
        <div className="w-full h-1 rounded-full mt-2 bg-slate-100 overflow-hidden">
            <div
                className={`h-full rounded-full ${color} opacity-80 transition-all duration-1000`}
                style={{ width: `${percentage}%` }}
            ></div>
        </div>
    </div>
)

const AirQualityCard = ({ data }) => {
    if (!data) {
        return (
            <div className="glass-card rounded-[2.5rem] p-8 h-full flex items-center justify-center animate-pulse border-none shadow-premium bg-white/40">
                <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">Loading AQI...</p>
            </div>
        )
    }

    const aqi = data.main.aqi
    const components = data.components

    const getAQIInfo = (index) => {
        switch (index) {
            case 1: return { label: 'Excellent', color: 'bg-emerald-500', text: 'emerald', msg: 'Clean air and ideal conditions.' }
            case 2: return { label: 'Good', color: 'bg-blue-500', text: 'blue', msg: 'Air quality is acceptable.' }
            case 3: return { label: 'Fair', color: 'bg-amber-500', text: 'amber', msg: 'Moderate pollution present.' }
            case 4: return { label: 'Poor', color: 'bg-orange-500', text: 'orange', msg: 'Unhealthy for sensitive groups.' }
            case 5: return { label: 'Very Poor', color: 'bg-red-500', text: 'red', msg: 'Health warning. Use caution.' }
            default: return { label: 'Unknown', color: 'bg-slate-500', text: 'slate', msg: 'Data unavailable.' }
        }
    }

    const info = getAQIInfo(aqi)

    return (
        <div className="glass-card rounded-[2.5rem] p-6 h-full flex flex-col shadow-premium border-none relative overflow-hidden group transition-all duration-500">
            {/* Background Glow */}
            <div className={`absolute top-0 right-0 w-32 h-32 ${info.color} opacity-5 blur-[60px] -mr-10 -mt-10 group-hover:opacity-10 transition-opacity`} />

            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                    <div className={`p-1.5 rounded-xl ${info.color} bg-opacity-10`}>
                        <Wind className={info.color.replace('bg-', 'text-')} size={18} strokeWidth={2.5} />
                    </div>
                    <h3 className="text-lg font-black text-slate-800 tracking-tight">Air Quality</h3>
                </div>
                <div className="flex items-center gap-2 px-2.5 py-1 bg-blue-50/50 backdrop-blur-sm text-blue-600 rounded-lg text-[9px] font-black uppercase tracking-widest border border-blue-100/50">
                    <span>Live</span>
                </div>
            </div>

            <div className={`flex items-center gap-4 mb-5 p-4 rounded-2xl border transition-all duration-500 bg-white/50 border-slate-100 group-hover:border-${info.text}-200/50 shadow-sm`}>
                <div className={`p-3 rounded-xl shadow-sm relative group-hover:scale-110 transition-transform duration-500 bg-gradient-to-br from-white to-slate-50 border border-slate-100`}>
                    <Wind className={info.text === 'slate' ? 'text-slate-400' : `text-${info.text}-500`} size={28} strokeWidth={1.5} />
                </div>
                <div className="space-y-1">
                    <div className={`inline-flex items-center px-3 py-0.5 ${info.color} text-white rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg shadow-${info.text}-500/20 animate-in zoom-in-50 duration-500`}>
                        {info.label}
                    </div>
                    <p className="text-slate-600 text-[11px] font-bold leading-tight line-clamp-2">{info.msg}</p>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mt-auto">
                <MetricItem label="PM2.5" value={components.pm2_5.toFixed(0)} unit="µg" color="bg-blue-400" percentage={Math.min((components.pm2_5 / 50) * 100, 100)} />
                <MetricItem label="PM10" value={components.pm10.toFixed(0)} unit="µg" color="bg-indigo-400" percentage={Math.min((components.pm10 / 100) * 100, 100)} />
                <MetricItem label="SO2" value={components.so2.toFixed(0)} unit="µg" color="bg-sky-400" percentage={Math.min((components.so2 / 100) * 100, 100)} />
                <MetricItem label="NO2" value={components.no2.toFixed(0)} unit="µg" color="bg-emerald-400" percentage={Math.min((components.no2 / 100) * 100, 100)} />
                <MetricItem label="O3" value={components.o3.toFixed(0)} unit="µg" color="bg-violet-400" percentage={Math.min((components.o3 / 150) * 100, 100)} />
                <MetricItem label="CO" value={(components.co / 1000).toFixed(1)} unit="mg" color="bg-rose-400" percentage={Math.min((components.co / 10000) * 100, 100)} />
            </div>
        </div>
    )
}

export default AirQualityCard
