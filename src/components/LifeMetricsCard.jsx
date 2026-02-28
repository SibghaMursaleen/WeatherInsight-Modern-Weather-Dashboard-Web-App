import React from 'react'
import { Sun, Eye, Gauge, Info } from 'lucide-react'

const Metric = ({ label, value, unit, icon: Icon, color, detail }) => (
    <div className="flex flex-col p-5 bg-white/50 rounded-3xl border border-slate-50 group hover:border-blue-100 transition-all duration-300">
        <div className="flex justify-between items-start mb-4">
            <div className={`p-2 rounded-xl bg-white shadow-sm transition-transform group-hover:scale-110 ${color}`}>
                <Icon size={18} strokeWidth={2.5} />
            </div>
            <div className="p-1 cursor-help opacity-20 hover:opacity-100 transition-opacity" title={detail}>
                <Info size={12} className="text-slate-400" />
            </div>
        </div>
        <div className="space-y-0.5">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
            <div className="flex items-baseline gap-1">
                <span className="text-xl font-black text-slate-800 tracking-tight">{value}</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase">{unit}</span>
            </div>
        </div>
    </div>
)

const LifeMetricsCard = ({ uv, visibility, pressure }) => {
    return (
        <div className="glass-card rounded-[2.5rem] p-6 h-full shadow-premium border-none flex flex-col">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-indigo-500/10 rounded-xl">
                    <Sun size={20} className="text-indigo-500" strokeWidth={2.5} />
                </div>
                <h3 className="text-lg font-black text-slate-800 tracking-tight">Life Metrics</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-1">
                <Metric
                    label="UV Index"
                    value={uv ?? '--'}
                    unit="Index"
                    icon={Sun}
                    color="text-amber-500"
                    detail="Ultraviolet radiation measurement from 0 to 11+."
                />
                <Metric
                    label="Visibility"
                    value={(visibility / 1000).toFixed(1)}
                    unit="KM"
                    icon={Eye}
                    color="text-blue-500"
                    detail="Measure of the distance at which an object can be clearly discerned."
                />
                <Metric
                    label="Pressure"
                    value={Math.round(pressure)}
                    unit="hPa"
                    icon={Gauge}
                    color="text-indigo-500"
                    detail="Atmospheric pressure adjusted to sea level."
                />
            </div>
        </div>
    )
}

export default LifeMetricsCard
