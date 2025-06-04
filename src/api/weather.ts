import axios from "axios";

const BASE_URL = import.meta.env.VITE_OPENWEATHER_BASE_URL;
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

export interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
  };
}

export const fetchCurrentWeather = async (
  lat: number,
  lon: number
): Promise<WeatherData> => {
  const url = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

  const response = await axios.get<WeatherData>(url);
  return response.data;
};

export const fetchCoordsFromCity = async (city: string) => {
  const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
    city
  )}&limit=1&appid=${API_KEY}`;

  const response = await axios.get(url);
  if (response.data.length === 0) {
    throw new Error("Ville non trouvée");
  }

  const { lat, lon } = response.data[0];
  return { lat, lon };
};
