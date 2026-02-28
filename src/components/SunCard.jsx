import React from 'react'
import { Sun, Moon, MapPin } from 'lucide-react'

const CitySunInfo = ({ city, sunrise, sunset, active = false }) => (
    <div className={`rounded-3xl p-5 border transition-all duration-300 ${active
        ? 'bg-blue-600 border-blue-500 shadow-xl shadow-blue-100 text-white'
        : 'bg-white border-slate-50 text-slate-600 hover:border-blue-100'
        }`}>
        <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
                <MapPin size={14} className={active ? 'text-blue-200' : 'text-blue-500'} />
                <span className="text-xs font-black uppercase tracking-widest">{city}</span>
            </div>
            <div className={`w-2 h-2 rounded-full ${active ? 'bg-white animate-pulse' : 'bg-slate-200'}`} />
        </div>
        <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl ${active ? 'bg-white/20' : 'bg-orange-50'}`}>
                    <Sun size={20} className={active ? 'text-white' : 'text-orange-500'} strokeWidth={2} />
                </div>
                <div>
                    <p className={`text-[10px] font-bold uppercase tracking-tight ${active ? 'text-white/60' : 'text-slate-400'}`}>Sunrise</p>
                    <p className="text-sm font-black tracking-tight">{sunrise}</p>
                </div>
            </div>
            <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl ${active ? 'bg-white/20' : 'bg-indigo-50'}`}>
                    <Moon size={20} className={active ? 'text-white' : 'text-indigo-500'} strokeWidth={2} />
                </div>
                <div>
                    <p className={`text-[10px] font-bold uppercase tracking-tight ${active ? 'text-white/60' : 'text-slate-400'}`}>Sunset</p>
                    <p className="text-sm font-black tracking-tight">{sunset}</p>
                </div>
            </div>
        </div>
    </div>
)

const SunCard = () => {
    return (
        <div className="glass-card rounded-[2.5rem] p-6 h-full flex flex-col gap-4 shadow-premium border-none overflow-hidden">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-black text-slate-800">Daylight Cycle</h3>
                <div className="px-3 py-1 bg-slate-100 text-slate-500 rounded-lg text-[9px] font-black uppercase tracking-widest">
                    Live
                </div>
            </div>

            <div className="flex-1 flex flex-col gap-4 justify-center">
                <CitySunInfo city="Islamabad" sunrise="6:32 AM" sunset="6:08 PM" active={true} />
                <CitySunInfo city="Karachi" sunrise="6:54 AM" sunset="6:35 PM" />
            </div>
        </div>
    )
}

export default SunCard
