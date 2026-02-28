import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
)

const RainChart = ({ forecast = [] }) => {
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: '#1e293b',
                padding: 12,
                titleFont: { size: 14, weight: 'bold' },
                bodyFont: { size: 13 },
                cornerRadius: 12,
                displayColors: false,
            }
        },
        scales: {
            y: {
                beginAtZero: false,
                display: false,
                grid: { display: false }
            },
            x: {
                grid: { display: false },
                ticks: {
                    font: { size: 12, weight: '600' },
                    color: '#94a3b8',
                    padding: 10
                }
            }
        },
        elements: {
            line: {
                tension: 0.4, // Smooth curve
            },
            point: {
                radius: 0,
                hoverRadius: 6,
                backgroundColor: '#3b82f6',
            }
        }
    }

    const labels = forecast.length > 0 ? forecast.map(f => f.day) : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
    const temps = forecast.length > 0 ? forecast.map(f => Math.round(f.temp)) : [20, 25, 22, 28, 24]

    const data = {
        labels,
        datasets: [
            {
                fill: true,
                label: 'Temperature',
                data: temps,
                borderColor: '#3b82f6',
                borderWidth: 4,
                backgroundColor: (context) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
                    gradient.addColorStop(0, 'rgba(59, 130, 246, 0.2)');
                    gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
                    return gradient;
                },
            },
        ],
    }

    return (
        <div className="glass-card rounded-[2.5rem] p-5 h-full flex flex-col shadow-premium border-none transition-all duration-500">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h3 className="text-xl font-black text-slate-800 tracking-tight">Weather Trends</h3>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5">Temperature Overview</p>
                </div>
                <div className="flex gap-2">
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 rounded-xl border border-slate-100">
                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                        <span className="text-[9px] font-black text-slate-500 uppercase tracking-wider">Temp</span>
                    </div>
                </div>
            </div>
            <div className="flex-1 min-h-[200px]">
                {forecast.length > 0 ? (
                    <Line options={options} data={data} />
                ) : (
                    <div className="w-full h-full bg-slate-50 rounded-[2rem] animate-pulse" />
                )}
            </div>
        </div>
    )
}

export default RainChart
