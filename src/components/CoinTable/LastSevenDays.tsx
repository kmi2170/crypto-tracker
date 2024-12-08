import Box from "@mui/material/Box";
import { Chart } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ChartOptions,
  ChartData,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

const options: ChartOptions = {
  responsive: true,
  maintainAspectRatio: true,
  scales: {
    x: { display: false },
    y: { display: false },
  },
  plugins: {
    legend: { display: false },
  },
};

const LastSevenDays = ({ price }: { price: number[] }) => {
  const labels = Array.from({ length: price.length }, (_, i) => i + 1);

  const chartData: ChartData<"line"> = {
    labels,
    datasets: [
      {
        data: price,
        borderWidth: 1,
        borderColor: "deeppink",
        pointRadius: 0,
      },
    ],
  };

  return (
    <Box sx={{ margin: "auto", height: "40px", width: "80px" }}>
      <Chart type="line" data={chartData} options={options} />
    </Box>
  );
};

export default LastSevenDays;
