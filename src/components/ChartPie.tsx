import Chart from "react-google-charts";

interface IChartPieProps {
  item: number;
  total: number;
  title: string;
}

export const ChartPie = ({ item, title, total }: IChartPieProps) => {
  return (
    <Chart
      height={"300px"}
      chartType="PieChart"
      data={[
        ["Serviços", "Quantidade"],
        [`Lazer`, 20],
        [`Contas fixas`, 30],
        [`Guardar`, 30],
      ]}
      options={{
        chartArea: {
          left: "0%",
          top: 50,
          width: "100%",
          height: "70%",
        },
        legend: {
          position: "right",
          alignment: "center",
          textStyle: {
            color: "white",
            fontSize: 16,
          },
        },

        colors: ["#ACF463", "#6F7568", "#9B77A0"],
        title: title,
        is3D: true,
        backgroundColor: "transparent",
        titleTextStyle: {
          fontSize: 18,
          color: "#E5E5E5",
        },
      }}
    />
  );
};
