import { useState, useEffect } from "react";
import {
  fetchCurrentWeather,
  fetchCoordsFromCity,
  fetchFiveDayForecast,
} from "../api/weather";
import type { WeatherData, ForecastEntry } from "../api/weather";

import TemperatureChart from "../components/TemperatureChart";
import ForecastCard from "../components/ForecastCard";
import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";

function Dashboard() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastEntry[]>([]);
  const [viewMode, setViewMode] = useState<"graph" | "cards">("graph");
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
          <WeatherCard weather={weather} />

          {forecast.length > 0 && (
            <>
              <div className="flex justify-end mt-6">
                <button
                  onClick={() =>
                    setViewMode((prev) =>
                      prev === "graph" ? "cards" : "graph"
                    )
                  }
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  {viewMode === "graph"
                    ? "Voir en cartes"
                    : "Voir le graphique"}
                </button>
              </div>

              {viewMode === "graph" ? (
                <TemperatureChart data={forecast} />
              ) : (
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                  {forecast.map((day) => (
                    <ForecastCard key={day.dt_txt} day={day} />
                  ))}
                </div>
              )}
            </>
          )}
        </>
      ) : (
        <p className="text-center mt-4">Chargement des données météo...</p>
      )}
    </div>
  );
}

export default Dashboard;
