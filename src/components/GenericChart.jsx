import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";

function GenericChart({ data, title, chartSettings }) {
  const formattedData = data.map((item) => ({
    key: new Date(item.date).toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "2-digit",
    }),
    count: item.weight,
  }));

  return (
    <div className="p-5">
      <h1 className="text-center">{title ? title : "Title Goes Here"}</h1>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={formattedData} margin={{ bottom: 50 }}>
          <XAxis dataKey="key" angle={-45} textAnchor="end" interval={0} />
          {chartSettings ? (
            <YAxis
              ticks={[145, 150, 155, 160, 165, 170]}
              interval={0}
              allowDuplicatedCategory={false}
              domain={[chartSettings.YDMin, chartSettings.YDMax]}
            />
          ) : (
            <YAxis />
          )}

          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8">
            <LabelList position="top" formatter={(value) => `${value}`} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default GenericChart;
