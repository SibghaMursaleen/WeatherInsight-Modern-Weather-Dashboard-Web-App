import React from 'react'
import { AlertTriangle, CloudRain, Zap, Thermometer, X } from 'lucide-react'

const WeatherAlert = ({ condition, temp, uv }) => {
    const getAlert = () => {
        if (condition === 'Thunderstorm') {
            return {
                title: 'Severe Thunderstorm Warning',
                msg: 'Stay indoors. Strong winds and lightning expected.',
                icon: Zap,
                color: 'text-amber-500',
                bgColor: 'bg-amber-500/10',
                borderColor: 'border-amber-200/50'
            }
        }
        if (condition === 'Rain' || condition === 'Snow') {
            return {
                title: `${condition} Alert`,
                msg: `Expect heavy ${condition.toLowerCase()} throughout the day.`,
                icon: condition === 'Rain' ? CloudRain : AlertTriangle,
                color: 'text-blue-500',
                bgColor: 'bg-blue-500/10',
                borderColor: 'border-blue-200/50'
            }
        }
        if (temp > 35) {
            return {
                title: 'Extreme Heat Advisory',
                msg: 'Temperatures are dangerously high. Stay hydrated.',
                icon: Thermometer,
                color: 'text-rose-500',
                bgColor: 'bg-rose-500/10',
                borderColor: 'border-rose-200/50'
            }
        }
        if (uv > 8) {
            return {
                title: 'High UV Index Warning',
                msg: 'UV levels are extreme (8+). Avoid direct sunlight.',
                icon: AlertTriangle,
                color: 'text-orange-500',
                bgColor: 'bg-orange-500/10',
                borderColor: 'border-orange-200/50'
            }
        }
        return null
    }

    const alert = getAlert()

    if (!alert) return null

    return (
        <div className={`flex-none mb-8 ${alert.bgColor} backdrop-blur-md border ${alert.borderColor} p-4 rounded-[2rem] flex items-center justify-between group animate-in slide-in-from-top-4 duration-700 shadow-lg shadow-black/5`}>
            <div className="flex items-center gap-4">
                <div className={`p-3 bg-white rounded-2xl shadow-sm ${alert.color} group-hover:scale-110 transition-transform`}>
                    <alert.icon size={24} strokeWidth={2.5} />
                </div>
                <div>
                    <h4 className={`text-sm font-black uppercase tracking-tight ${alert.color}`}>{alert.title}</h4>
                    <p className="text-slate-600 text-xs font-bold">{alert.msg}</p>
                </div>
            </div>
            <button className="p-2 hover:bg-white/50 rounded-xl transition-colors">
                <X size={16} className="text-slate-400" />
            </button>
        </div>
    )
}

export default WeatherAlert
