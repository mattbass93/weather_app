import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

interface Props {
  data: {
    dt_txt: string;
    main: {
      temp_min: number;
      temp_max: number;
    };
  }[];
}

function TemperatureChart({ data }: Props) {
  const chartData = data.map((entry) => ({
    name: new Date(entry.dt_txt).toLocaleDateString("fr-FR", {
      weekday: "short",
    }),
    temp_min: entry.main.temp_min,
    temp_max: entry.main.temp_max,
  }));

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-2">
        Prévisions à 5 jours (12h) – Températures min/max
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="name" />
          <YAxis unit="°C" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="temp_max"
            stroke="#ef4444"
            strokeWidth={2}
            name="Max"
          />
          <Line
            type="monotone"
            dataKey="temp_min"
            stroke="#3b82f6"
            strokeWidth={2}
            name="Min"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default TemperatureChart;
