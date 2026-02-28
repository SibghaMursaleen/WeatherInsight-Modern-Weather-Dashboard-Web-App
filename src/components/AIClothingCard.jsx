import React from 'react'
import { Shirt, Umbrella, ShieldCheck, Sun, Thermometer } from 'lucide-react'

const AIClothingCard = ({ temp, condition, uv }) => {
    const getAdvice = () => {
        let advice = []
        let status = 'Safe'
        let color = 'text-emerald-500'
        let bgColor = 'bg-emerald-50'

        if (condition === 'Rain' || condition === 'Drizzle' || condition === 'Thunderstorm') {
            advice.push({ text: 'Bring an Umbrella', icon: Umbrella, color: 'text-blue-500' })
        }

        if (temp > 28) {
            advice.push({ text: 'Light Cotton Clothes', icon: Shirt, color: 'text-orange-500' })
        } else if (temp < 15) {
            advice.push({ text: 'Wear Warm Layers', icon: Shirt, color: 'text-blue-500' })
        } else {
            advice.push({ text: 'Casual Comfort', icon: Shirt, color: 'text-slate-500' })
        }

        if (uv > 6) {
            status = 'Caution'
            color = 'text-amber-600'
            bgColor = 'bg-amber-50'
            advice.push({ text: 'Apply Sunscreen', icon: Sun, color: 'text-amber-500' })
        }

        return { advice, status, color, bgColor }
    }

    const { advice, status, color, bgColor } = getAdvice()

    return (
        <div className="glass-card rounded-[2.5rem] p-6 h-full flex flex-col shadow-premium border-none relative overflow-hidden group transition-all duration-500">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/10 rounded-xl">
                        <Shirt size={20} className="text-blue-500" strokeWidth={2.5} />
                    </div>
                    <h3 className="text-lg font-black text-slate-800 tracking-tight">What to Wear</h3>
                </div>
                <div className={`px-2.5 py-1 ${bgColor} ${color} rounded-lg text-[10px] font-black uppercase tracking-widest border border-current opacity-70`}>
                    {status}
                </div>
            </div>

            <div className="flex-1 flex flex-col gap-4">
                {advice.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-4 bg-white/50 rounded-2xl border border-slate-50 group/item hover:border-blue-100 transition-all duration-300">
                        <div className={`p-2.5 rounded-lg bg-white shadow-sm group-hover/item:scale-110 transition-transform ${item.color}`}>
                            <item.icon size={20} strokeWidth={2} />
                        </div>
                        <p className="text-sm font-bold text-slate-700">{item.text}</p>
                    </div>
                ))}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-50">
                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <ShieldCheck size={12} className="text-emerald-500" />
                    <span>AI Comfort Index Based on current {temp}°C</span>
                </div>
            </div>
        </div>
    )
}

export default AIClothingCard
