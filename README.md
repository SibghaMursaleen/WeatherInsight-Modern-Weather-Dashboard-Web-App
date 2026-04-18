# 🌦️ WeatherInsight - Modern Weather Dashboard

[![ISC License](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![React](https://img.shields.io/badge/React-19.0-blue)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.0-purple)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4.0-38b2ac)](https://tailwindcss.com/)

WeatherInsight is a premium, responsive weather application designed with a modern SaaS aesthetic. It provides users with real-time weather data, advanced metrics, and personalized insights using the OpenWeatherMap API.

---

## ✨ Key Features

-   **🎯 Real-Time Monitoring**: Accurate temperature, humidity, and weather conditions for any city globally.
-   **🧥 AI Clothing Assistant**: Smart recommendations on what to wear based on current weather conditions.
-   **📅 5-Day Visual Forecast**: Stay ahead with a clear, compact visualization of the upcoming week.
-   **🌬️ Air Quality Index (AQI)**: Detailed breakdown of air quality and pollutants (PM2.5, NO2, etc.).
-   **📊 Dynamic Data Visuals**: Interactive rainfall and temperature trends powered by Chart.js.
-   **🌇 Sun & Moon Cycles**: Real-time tracking of sunrise, sunset, and solar phases.
-   **📱 Fully Responsive**: Seamless experience across mobile, tablet, and desktop devices.
-   **🎨 Premium UI**: Glassmorphism effects, smooth animations, and a curated color palette.

---

## 🛠️ Tech Stack

-   **Framework**: [React.js](https://reactjs.org/) (v19)
-   **Build Tool**: [Vite](https://vitejs.dev/)
-   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
-   **Data Fetching**: [Axios](https://axios-http.com/)
-   **Charts**: [Chart.js](https://www.chartjs.org/) & [react-chartjs-2](https://react-chartjs-2.js.org/)
-   **Icons**: [Lucide React](https://lucide.dev/)
-   **API**: [OpenWeatherMap API](https://openweathermap.org/api)

---

## 🚀 Getting Started

### Prerequisites

-   Node.js (v18 or higher)
-   npm or yarn
-   An API Key from [OpenWeatherMap](https://home.openweathermap.org/api_keys)

### Installation

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/SibghaMursaleen/WeatherInsight-Modern-Weather-Dashboard-Web-App.git
    cd WeatherInsight-Modern-Weather-Dashboard-Web-App
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Environment Configuration**
    Create a `.env` file in the root directory:
    ```bash
    cp .env.example .env # Or manually create it
    ```
    Add your API key to `.env`:
    ```env
    VITE_WEATHER_API_KEY=your_api_key_here
    ```

4.  **Launch Development Server**
    ```bash
    npm run dev
    ```

---

## 📂 Project Structure

```text
src/
├── components/          # Reusable UI components
│   ├── AIClothingCard.jsx
│   ├── AirQualityCard.jsx
│   ├── ForecastCard.jsx
│   ├── Header.jsx
│   ├── Sidebar.jsx
│   └── ...
├── services/            # API integration & business logic
│   └── weather.js
├── App.jsx              # Main dashboard layout
├── index.css            # Tailwind & global styles
└── main.jsx             # React entry point
```

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the ISC License. See `LICENSE` for more information.

---

## 👨‍💻 Developed By

**Sibgha Mursaleen** - [GitHub Profile](https://github.com/SibghaMursaleen)

---

> [!TIP]
> Make sure to enable Geolocation in your browser for the app to automatically detect your local weather!
