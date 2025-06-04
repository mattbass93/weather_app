import type { WeatherData } from "../api/weather";

interface Props {
  weather: WeatherData;
}

function WeatherCard({ weather }: Props) {
  const { name, main, wind, weather: weatherInfo } = weather;
  const icon = weatherInfo[0].icon;
  const description = weatherInfo[0].description;

  return (
    <div className="bg-blue-100 p-6 rounded-xl shadow text-center">
      <h2 className="text-2xl font-bold mb-2">{name}</h2>

      <div className="flex flex-col items-center">
        <img
          src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
          alt="icone météo"
          className="w-20 h-20"
        />
        <p className="text-3xl font-semibold">{main.temp} °C</p>
        <p className="capitalize text-gray-700">{description}</p>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <div className="bg-white p-3 rounded shadow-inner">
          💧 Humidité<br />
          <span className="font-semibold">{main.humidity} %</span>
        </div>
        <div className="bg-white p-3 rounded shadow-inner">
          💨 Vent<br />
          <span className="font-semibold">{wind.speed} m/s</span>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;
