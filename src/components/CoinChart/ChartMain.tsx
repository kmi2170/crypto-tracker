import Box from "@mui/material/Box";
import { Chart } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
  Filler,
} from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";

import { dataItems, DataItemsType } from "../../config/chart/chartButtons";
import { verticalLineOnHover } from "../../config/chart/plugins";
import { getCurrencySymbol } from "../../lib/getCurrencySymbol";
import { formatNumber } from "../../lib/formatNumber";
import { Currencies } from "../../context/types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  zoomPlugin
);

type ChartMainProps = {
  currency: Currencies;
  itemName: DataItemsType;
  labels: string[];
  values: number[];
};

const ChartMain = (props: ChartMainProps) => {
  const { currency, itemName, labels, values } = props;

  const options: ChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    scales: {
      x: {
        ticks: { maxTicksLimit: 8 },
      },
      y: {
        ticks: {
          callback: (value) => formatNumber(Number(value), 2),
        },
      },
    },
    plugins: {
      tooltip: {
        enabled: true,
        position: "nearest",
        callbacks: {
          label: (context) => {
            const symbol = getCurrencySymbol(currency);
            const label = dataItems.filter((item) => item.value === itemName)[0]
              .label;
            const value = context.parsed.y;
            return `${label}: ${symbol} ${formatNumber(value, 3)}`;
          },
        },
      },
      legend: {
        display: false,
      },
      zoom: {
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: "x",
        },
        // limits: {
        //   x: { min: 0, max: 5 },
        //   y: { min: 0, max: 5 },
        // },
      },
    },
  };

  const rgba = (opacity: number) =>
    `rgba(${
      dataItems.filter((item) => item.value === itemName)[0].colorRGB
    }, ${opacity})`;

  const chartData: ChartData<"line"> = {
    labels,
    datasets: [
      {
        data: values,
        borderColor: rgba(1.0),
        borderWidth: 2,
        pointRadius: 0,
        pointHoverBackgroundColor: "cyan",
        pointHoverRadius: 6,
        fill: true,
        backgroundColor: (context) => {
          const bgColor = [
            rgba(0.5),
            rgba(0.4),
            rgba(0.3),
            rgba(0.2),
            rgba(0.1),
            rgba(0.0),
          ];

          if (!context.chart.chartArea) {
            return;
          }

          const {
            ctx,
            data,
            chartArea: { top, bottom },
          } = context.chart;
          const gradientBg = ctx.createLinearGradient(0, top, 0, bottom);
          const colorTranches = 1 / (bgColor.length - 1);
          for (let i = 0; i < bgColor.length; i++) {
            gradientBg.addColorStop(0 + i * colorTranches, bgColor[i]);
          }

          return gradientBg;
        },
      },
    ],
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "450px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Chart
        type="line"
        data={chartData}
        options={options}
        plugins={[verticalLineOnHover]}
      />
    </Box>
  );
};

export default ChartMain;
