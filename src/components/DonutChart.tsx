import Chart from "react-google-charts";

interface IChartPieProps {
  item: number;
  total: number;
  title: string;
}

export const DonutChart = ({ title }: any) => {
  const options = {
    pieHole: 0.8,
    is3D: false,
    backgroundColor: "transparent",
    title: title,
    legend: {
      position: "none",
    },
    colors: ["#ACF463", "#555555"],
    titleTextStyle: {
      fontSize: 18,
      color: "#E5E5E5",
    },
    chartArea: {
      left: "0%",
      top: 50,
      width: "100%",
      height: "75%",
    },
  };
  return (
    <Chart
      chartType="PieChart"
      width="100%"
      height="300px"
      data={[
        ["Task", "Hours per Day"],
        ["Work", 11],
        ["Eat", 2],
      ]}
      options={options}
    />
  );
};
