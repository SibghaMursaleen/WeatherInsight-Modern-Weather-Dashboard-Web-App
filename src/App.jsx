import { useState, useEffect } from 'react'
import Header from './components/Header'
import WeatherCard from './components/WeatherCard'
import ForecastCard from './components/ForecastCard'
import AirQualityCard from './components/AirQualityCard'
import RainChart from './components/RainChart'
import { fetchCurrentWeather, fetchWeatherByCoords, fetchAirQuality, fetchExtendedForecast } from './services/weather'

const App = () => {
    const [weatherData, setWeatherData] = useState(null)
    const [forecastData, setForecastData] = useState({ daily: [], hourly: [] })
    const [airQualityData, setAirQualityData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [currentCity, setCurrentCity] = useState('Islamabad')
    const [viewType, setViewType] = useState('daily')

    const loadWeather = async (cityOrCoords) => {
        setLoading(true)
        setError(null)
        try {
            let data;

            if (typeof cityOrCoords === 'string') {
                const q = cityOrCoords.includes(',') ? cityOrCoords : `${cityOrCoords}`
                data = await fetchCurrentWeather(q)
            } else {
                const { lat, lon } = cityOrCoords
                data = await fetchWeatherByCoords(lat, lon)
            }

            setWeatherData(data)
            setCurrentCity(data.name)

            // Fetch 10-Day & Hourly Forecast from Open-Meteo
            const extendedData = await fetchExtendedForecast(data.coord.lat, data.coord.lon)
            setForecastData(extendedData)

            // Fetch Air Quality based on coordinates from the weather data
            const aqData = await fetchAirQuality(data.coord.lat, data.coord.lon)
            setAirQualityData(aqData.list[0])
        } catch (err) {
            console.error('Weather fetch error:', err)
            if (err.response && err.response.status === 404) {
                setError(`City "${typeof cityOrCoords === 'string' ? cityOrCoords : 'Detected Location'}" was not found.`)
            } else if (err.response && err.response.status === 401) {
                setError('Invalid API Key. Please check your .env file.')
            } else {
                setError('Unable to fetch weather data. Please check your connection or try a different city.')
            }
        } finally {
            setLoading(false)
        }
    }

    const handleLocateMe = () => {
        if (!("geolocation" in navigator)) {
            setError("Geolocation is not supported by your browser.")
            return
        }

        setLoading(true)
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords
                loadWeather({ lat: latitude, lon: longitude })
            },
            (err) => {
                console.warn("Geolocation error:", err)
                let msg = "Could not detect location. "
                if (err.code === 1) msg += "Please enable location access."
                else if (err.code === 2) msg += "Position unavailable."
                else if (err.code === 3) msg += "Request timed out."

                setError(msg)
                setLoading(false)
                if (!weatherData) loadWeather('Islamabad,PK')
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            }
        )
    }

    useEffect(() => {
        handleLocateMe()
    }, [])

    const getWeatherTheme = (condition) => {
        if (!condition) return {
            bg: 'bg-slate-50',
            blur1: 'bg-blue-400/20',
            blur2: 'bg-indigo-400/20',
            blur3: 'bg-sky-300/10',
            glow: false
        }

        switch (condition) {
            case 'Clear':
            case 'Sunny':
                return {
                    bg: 'bg-amber-50/50',
                    blur1: 'bg-yellow-400/40',
                    blur2: 'bg-orange-400/30',
                    blur3: 'bg-amber-300/20',
                    glow: true
                }
            case 'Rain':
            case 'Drizzle':
            case 'Thunderstorm':
                return {
                    bg: 'bg-indigo-950/5',
                    blur1: 'bg-blue-600/10',
                    blur2: 'bg-slate-500/10',
                    blur3: 'bg-indigo-400/10',
                    glow: false
                }
            case 'Clouds':
                return {
                    bg: 'bg-slate-100',
                    blur1: 'bg-blue-200/20',
                    blur2: 'bg-indigo-100/20',
                    blur3: 'bg-slate-200/20',
                    glow: false
                }
            default:
                return {
                    bg: 'bg-slate-50',
                    blur1: 'bg-blue-400/20',
                    blur2: 'bg-indigo-400/20',
                    blur3: 'bg-sky-300/10',
                    glow: false
                }
        }
    }

    const theme = getWeatherTheme(weatherData?.weather[0]?.main)

    return (
        <div className={`min-h-screen flex p-6 font-sans relative transition-all duration-1000 ${theme.bg} text-slate-800`}>
            {/* Dynamic Background Blurs */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className={`absolute top-[-10%] left-[-10%] w-[60%] h-[60%] ${theme.blur1} rounded-full blur-[120px] transition-all duration-1000 animate-pulse`} />
                <div className={`absolute bottom-[0%] right-[-10%] w-[50%] h-[50%] ${theme.blur2} rounded-full blur-[100px] transition-all duration-1000`} />
                <div className={`absolute top-[40%] left-[30%] w-[40%] h-[40%] ${theme.blur3} rounded-full blur-[80px] transition-all duration-1000`} />

                {/* Sun Glow Effect for Sunny Weather */}
                {theme.glow && (
                    <div className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] bg-gradient-to-br from-yellow-300/40 via-orange-400/20 to-transparent rounded-full blur-[120px] animate-pulse-slow pointer-events-none" />
                )}
            </div>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col gap-8 max-w-[1600px] mx-auto w-full relative z-10 py-4 pb-12">
                <div className="flex-none">
                    <Header
                        onSearch={loadWeather}
                        onLocate={handleLocateMe}
                    />
                </div>

                {error && (
                    <div className="flex-none bg-red-50/80 backdrop-blur-md text-red-500 p-4 rounded-3xl border border-red-100 animate-in fade-in slide-in-from-top-4 duration-500 flex items-center gap-3 font-bold shadow-sm">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                        {error}
                    </div>
                )}



                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Analytical Block */}
                    <div className="lg:col-span-8 flex flex-col gap-8">
                        {/* Hero Weather */}
                        <div className="flex-none">
                            {loading ? (
                                <div className="glass-card rounded-[2.5rem] p-8 h-[280px] flex items-center justify-center animate-pulse border-none shadow-premium bg-white/40">
                                    <div className="w-12 h-12 border-[5px] border-blue-500 border-t-transparent rounded-full animate-spin" />
                                </div>
                            ) : (
                                <WeatherCard
                                    city={weatherData?.name}
                                    temp={Math.round(weatherData?.main?.temp)}
                                    condition={weatherData?.weather[0]?.main}
                                    wind={Math.round(weatherData?.wind?.speed * 3.6)}
                                    humidity={weatherData?.main?.humidity}
                                    sunrise={weatherData?.sys?.sunrise}
                                    sunset={weatherData?.sys?.sunset}
                                />
                            )}
                        </div>

                        {/* Trends Chart */}
                        <div className="h-[350px]">
                            <RainChart forecast={forecastData.daily} />
                        </div>
                    </div>

                    {/* Right Detail Block */}
                    <div className="lg:col-span-4 flex flex-col gap-8">
                        <div>
                            <AirQualityCard data={airQualityData} />
                        </div>

                        {/* Major Hubs Context - Horizontal Slim Row */}
                        <div className="flex-none flex flex-col gap-4">
                            <div className="flex justify-between items-center px-2">
                                <h3 className="text-[11px] font-black text-slate-800 tracking-tight uppercase opacity-50">Major Hubs</h3>
                                <div className="flex gap-1.5 items-center">
                                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
                                    <span className="text-[9px] font-black text-blue-500 uppercase tracking-widest">Real-time PK</span>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {(() => {
                                    const hubHour = new Date().getHours()
                                    const isNight = hubHour >= 18 || hubHour < 6
                                    return [
                                        { city: 'Lahore', temp: 26, color: 'from-pink-500/90 to-rose-500/90', icon: isNight ? '🌙' : '☀️' },
                                        { city: 'Islamabad', temp: 22, color: 'from-blue-500/90 to-indigo-500/90', icon: isNight ? '🌙' : '🌤️' },
                                        { city: 'Karachi', temp: 31, color: 'from-orange-400/90 to-amber-500/90', icon: isNight ? '🌙' : '☀️' }
                                    ].map((item, idx) => (
                                        <div key={idx} className={`relative group overflow-hidden bg-gradient-to-br ${item.color} rounded-[2rem] p-6 text-white shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer active:scale-95 flex flex-col justify-center min-h-[140px] ${idx === 2 ? 'md:col-span-2' : ''}`}>
                                            {/* Glass Reflection Effect */}
                                            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                                            <div className={`relative z-10 flex ${idx === 2 ? 'md:flex-row md:items-center md:justify-between' : 'flex-col gap-3'}`}>
                                                <div className="flex justify-between items-start md:items-center gap-4">
                                                    <div>
                                                        <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-70 group-hover:opacity-100 transition-opacity mb-1">{item.city}</p>
                                                        <p className={`${idx === 2 ? 'text-5xl' : 'text-4xl'} font-black drop-shadow-md transition-transform group-hover:translate-x-1 duration-500 tracking-tighter`}>{item.temp}°</p>
                                                    </div>
                                                    {idx !== 2 && (
                                                        <div className="p-2 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20 group-hover:bg-white/30 group-hover:rotate-12 transition-all duration-500 shadow-lg">
                                                            <span className="text-xl">{item.icon}</span>
                                                        </div>
                                                    )}
                                                </div>
                                                {idx === 2 && (
                                                    <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 group-hover:bg-white/30 group-hover:rotate-12 transition-all duration-500 shadow-xl self-end md:self-auto">
                                                        <span className="text-3xl">{item.icon}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                })()}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Outlook Section */}
                <div className="flex-none">
                    <div className="glass-card rounded-[2.5rem] p-6 shadow-premium border-none">
                        <div className="flex justify-between items-center mb-6 text-slate-800">
                            <div className="flex items-center gap-6">
                                <div>
                                    <h3 className="text-base font-black tracking-tight">{viewType === 'daily' ? '10-Day' : '24-Hour'} Outlook</h3>
                                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                                        {viewType === 'daily' ? 'Next 240 Hours' : 'Upcoming Day'}
                                    </p>
                                </div>
                                <div className="flex bg-slate-100 p-1 rounded-xl gap-1">
                                    <button
                                        onClick={() => setViewType('daily')}
                                        className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all duration-300 ${viewType === 'daily' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                                    >
                                        Daily
                                    </button>
                                    <button
                                        onClick={() => setViewType('hourly')}
                                        className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all duration-300 ${viewType === 'hourly' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                                    >
                                        Hourly
                                    </button>
                                </div>
                            </div>
                            <div className="px-2.5 py-1 bg-blue-50/50 text-blue-600 rounded-lg text-[9px] font-black uppercase tracking-widest border border-blue-100/50">
                                Live Outlook
                            </div>
                        </div>
                        <ForecastCard data={viewType === 'daily' ? forecastData.daily : forecastData.hourly} />
                    </div>
                </div>
            </main>
        </div>
    )
}

export default App
