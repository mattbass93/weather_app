interface ForecastDay {
  dt_txt: string;
  main: {
    temp_min: number;
    temp_max: number;
  };
}

interface Props {
  day: ForecastDay;
}

function ForecastCard({ day }: Props) {
  const date = new Date(day.dt_txt);
  const weekday = date.toLocaleDateString("fr-FR", { weekday: "long" });

  return (
    <div className="bg-white shadow rounded-lg p-4 text-center">
      <h4 className="font-semibold text-lg mb-2">{weekday}</h4>
      <p className="text-sm text-gray-600">{date.toLocaleDateString()}</p>
      <div className="mt-4">
        <p>🌡 Max : {day.main.temp_max} °C</p>
        <p>🌡 Min : {day.main.temp_min} °C</p>
      </div>
    </div>
  );
}

export default ForecastCard;
