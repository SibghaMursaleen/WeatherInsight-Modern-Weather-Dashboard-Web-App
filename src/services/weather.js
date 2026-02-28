import axios from 'axios';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

console.log('Weather Service: API Key loaded (first 4 chars):', API_KEY?.substring(0, 4) + '...');

/**
 * Fetch current weather data for a specific city.
 * @param {string} city - The name of the city.
 */
export const fetchCurrentWeather = async (city) => {
    try {
        const response = await axios.get(`${BASE_URL}/weather`, {
            params: {
                q: city,
                appid: API_KEY,
                units: 'metric', // Use Celsius
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching current weather:', error);
        throw error;
    }
};

/**
 * Fetch current weather data by coordinates.
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 */
export const fetchWeatherByCoords = async (lat, lon) => {
    try {
        const response = await axios.get(`${BASE_URL}/weather`, {
            params: {
                lat,
                lon,
                appid: API_KEY,
                units: 'metric',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching current weather by coords:', error);
        throw error;
    }
};

/**
 * Fetch 5-day forecast data for a specific city.
 * @param {string} city - The name of the city.
 */
export const fetchForecast = async (city) => {
    try {
        const response = await axios.get(`${BASE_URL}/forecast`, {
            params: {
                q: city,
                appid: API_KEY,
                units: 'metric',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching forecast:', error);
        throw error;
    }
};

/**
 * Fetch 5-day forecast data by coordinates.
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 */
export const fetchForecastByCoords = async (lat, lon) => {
    try {
        const response = await axios.get(`${BASE_URL}/forecast`, {
            params: {
                lat,
                lon,
                appid: API_KEY,
                units: 'metric',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching forecast by coords:', error);
        throw error;
    }
};

/**
 * Fetch Air Quality data by coordinates.
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 */
export const fetchAirQuality = async (lat, lon) => {
    try {
        const response = await axios.get(`${BASE_URL}/air_pollution`, {
            params: {
                lat,
                lon,
                appid: API_KEY,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching air quality:', error);
        throw error;
    }
};
/**
 * Fetch 10-day forecast data by coordinates using Open-Meteo.
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 */
export const fetchExtendedForecast = async (lat, lon) => {
    try {
        const response = await axios.get('https://api.open-meteo.com/v1/forecast', {
            params: {
                latitude: lat,
                longitude: lon,
                daily: 'weather_code,temperature_2m_max,uv_index_max',
                hourly: 'temperature_2m,weather_code,visibility,pressure_msl',
                timezone: 'auto',
                forecast_days: 10
            },
        });

        const mapMeteoCode = (code) => {
            if (code === 0) return 'Clear';
            if ([1, 2, 3].includes(code)) return 'Clouds';
            if ([45, 48].includes(code)) return 'Clouds';
            if ([51, 53, 55].includes(code)) return 'Drizzle';
            if ([61, 63, 65, 80, 81, 82].includes(code)) return 'Rain';
            if ([71, 73, 75, 77, 85, 86].includes(code)) return 'Snow';
            if ([95, 96, 99].includes(code)) return 'Thunderstorm';
            return 'Clouds';
        };

        const daily = response.data.daily.time.map((time, i) => ({
            day: new Date(time).toLocaleDateString('en-GB', { weekday: 'short' }),
            temp: response.data.daily.temperature_2m_max[i],
            condition: mapMeteoCode(response.data.daily.weather_code[i]),
            uv: response.data.daily.uv_index_max[i],
        }));

        // Get next 24 hours for the hourly forecast
        const hourly = response.data.hourly.time.slice(0, 24).map((time, i) => ({
            time: new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            temp: response.data.hourly.temperature_2m[i],
            condition: mapMeteoCode(response.data.hourly.weather_code[i]),
            visibility: response.data.hourly.visibility[i],
            pressure: response.data.hourly.pressure_msl[i]
        }));

        return { daily, hourly };
    } catch (error) {
        console.error('Error fetching extended forecast:', error);
        throw error;
    }
};
