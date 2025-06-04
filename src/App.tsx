import { useEffect, useState } from "react";
import { fetchCurrentWeather } from "./api/weather";
import type { WeatherData } from "./api/weather";


function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    // Coordonnées de Paris
    const lat = 48.8566;
    const lon = 2.3522;

    fetchCurrentWeather(lat, lon)
      .then(setWeather)
      .catch((err) => console.error("Erreur météo:", err));
  }, []);

  return (
    <div className="p-6 font-sans text-gray-800">
      <h1 className="text-3xl font-bold mb-4">Météo actuelle</h1>
      {weather ? (
        <div className="bg-blue-100 p-4 rounded-xl shadow max-w-md">
          <h2 className="text-xl font-semibold">{weather.name}</h2>
          <p className="text-lg">🌡 Température : {weather.main.temp} °C</p>
          <p>💧 Humidité : {weather.main.humidity} %</p>
          <p>💨 Vent : {weather.wind.speed} m/s</p>
          <p>☁️ Ciel : {weather.weather[0].description}</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="icone météo"
          />
        </div>
      ) : (
        <p>Chargement...</p>
      )}
    </div>
  );
}

export default App;
