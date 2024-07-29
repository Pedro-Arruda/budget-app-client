import { Chart } from "react-google-charts";

export function BarChart({ data }: any) {
  return (
    <Chart
      chartType="ColumnChart"
      width="100%"
      height="300px"
      data={data}
      options={{
        backgroundColor: "transparent",
        hAxis: {
          textStyle: { color: "#dddddd" },
        },
        vAxis: {
          textStyle: { color: "#dddddd" },
          gridlines: {
            color: "#444444",
            count: 2,
          },
          minorGridlines: {
            color: "#333333",
          },
        },
        legend: {
          position: "top",
          textStyle: { color: "#dddddd" },
        },

        colors: ["#f49595", "#f9eb97", "#e2bbfd", "#d4f1b7"],
      }}
    />
  );
}
