import React from 'react'
import { Map as MapIcon, Maximize2 } from 'lucide-react'

const WeatherMap = ({ lat, lon }) => {
    // Windy.com provides a high-quality free embed for weather visualization
    const embedUrl = `https://embed.windy.com/embed2.html?lat=${lat || 33.6844}&lon=${lon || 73.0479}&zoom=4&level=surface&overlay=rain&product=ecmwf&menu=&message=&marker=&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=default&metricTemp=default&radarRange=-1`

    return (
        <div className="glass-card rounded-[2.5rem] p-0 h-full shadow-premium border-none relative overflow-hidden group transition-all duration-500 min-h-[400px]">
            {/* Header Overlay */}
            <div className="absolute top-6 left-6 z-10 flex items-center gap-3 bg-white/80 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg border border-white/50">
                <div className="p-1.5 bg-blue-500 rounded-lg">
                    <MapIcon size={16} className="text-white" />
                </div>
                <h3 className="text-sm font-black text-slate-800 tracking-tight">Live Radar</h3>
            </div>

            {/* Map Frame */}
            <div className="w-full h-full relative">
                <iframe
                    title="Weather Map"
                    src={embedUrl}
                    className="w-full h-full border-none"
                    allowFullScreen
                />

                {/* Visual Glass Edge Overlay to blend the iframe edges */}
                <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
                <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white/10 to-transparent pointer-events-none" />
            </div>

            {/* Legend / Status Overlay */}
            <div className="absolute bottom-6 left-6 z-10 px-3 py-1.5 bg-slate-900/80 backdrop-blur-md rounded-xl text-[9px] font-black text-white uppercase tracking-widest flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
                Satellite Composite
            </div>
        </div>
    )
}

export default WeatherMap
