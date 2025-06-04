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
