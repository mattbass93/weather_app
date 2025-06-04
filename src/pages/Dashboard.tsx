import { useState, useEffect } from "react";
import { fetchCurrentWeather, fetchCoordsFromCity, fetchFiveDayForecast } from "../api/weather";
import type { WeatherData } from "../api/weather";
import type { ForecastEntry } from "../api/weather";
import TemperatureChart from "../components/TemperatureChart";
import SearchBar from "../components/SearchBar";

function Dashboard() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastEntry[]>([]);

  const [city, setCity] = useState("Nantes");

  useEffect(() => {
async function loadWeather() {
  try {
    const { lat, lon } = await fetchCoordsFromCity(city);
    const data = await fetchCurrentWeather(lat, lon);
    const daily = await fetchFiveDayForecast(lat, lon);

    setWeather(data);
    setForecast(daily);
  } catch (err) {
    console.error("Erreur lors du chargement météo :", err);
  }
}


    loadWeather();
  }, [city]);

  return (
    <div className="p-6 max-w-2xl mx-auto">
  <h1 className="text-3xl font-bold mb-6 text-center">Dashboard Météo</h1>

  <div className="mb-4">
    <SearchBar onSearch={setCity} />
  </div>

{weather ? (
  <>
    <div className="bg-blue-100 p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold">{weather.name}</h2>
      <p>🌡 Température : {weather.main.temp} °C</p>
      <p>💧 Humidité : {weather.main.humidity} %</p>
      <p>💨 Vent : {weather.wind.speed} m/s</p>
      <p>☁️ Ciel : {weather.weather[0].description}</p>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt="icone météo"
      />
    </div>

    {forecast.length > 0 && <TemperatureChart data={forecast} />}
  </>
) : (
  <p className="text-center mt-4">Chargement des données météo...</p>
)}

</div>

  );
}

export default Dashboard;
