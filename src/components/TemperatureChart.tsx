import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
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
    <div className="mt-8 bg-white p-6 rounded-xl shadow text-center">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">
        Prévisions à 5 jours (12h) – Températures Min / Max
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid stroke="#e5e7eb" strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis unit="°C" />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="temp_max"
            stroke="#ef4444"
            strokeWidth={2}
            name="Température max"
          />
          <Line
            type="monotone"
            dataKey="temp_min"
            stroke="#3b82f6"
            strokeWidth={2}
            name="Température min"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default TemperatureChart;
