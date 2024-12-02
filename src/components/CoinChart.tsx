import { useCallback, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
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
import zoomPlugin, { zoom } from "chartjs-plugin-zoom";

import SelectButton from "./SelectButton";
import {
  chartDays,
  dataItems,
  DataItemsType,
} from "../config/chart/chartButtons";
import {
  configForUseQuery,
  fetchHistorical,
  fetchHistoricalDummy,
} from "../lib/fetchFunctions";
import { Historical } from "../context/types";
import { getDate, getDayTime, getTime } from "../lib/dateTime";
import { createExternalTooltipHandler } from "../config/chart/tooltip";
import { verticalLineOnHover } from "../config/chart/plugins";
import { getCurrencySymbol } from "../lib/getCurrencySymbol";
import { formatNumber } from "../lib/formatNumber";

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

type CoinChartProps = {
  id: string;
  currency: string;
};

const CoinChart = (props: CoinChartProps) => {
  const { id, currency } = props;

  const [days, setDays] = useState<number>(1);
  const [dataItem, setDataItem] = useState<DataItemsType>("prices");

  const { data: historical, isLoading } = useQuery({
    queryKey: ["history", { id, currency, days }],
    // queryFn: () => fetchHistorical(id, currency, days),
    queryFn: () => fetchHistoricalDummy(id, currency, days),
    ...configForUseQuery,
  });

  const labels = historical?.[dataItem].map((data) => {
    const dt = days === 1 ? getTime(data[0]) : getDate(data[0]);
    return dt;
  }) as string[];
  const dataValues = historical?.[dataItem].map((data) => data[1]) as number[];

  const handleSelectDays = useCallback((value: number) => setDays(value), []);
  const handleSelectDataItem = useCallback(
    (value: DataItemsType) => setDataItem(value),
    []
  );

  // const externalTooltipHandler = createExternalTooltipHandler(currency);

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
        // external: externalTooltipHandler,
        callbacks: {
          label: (context) => {
            const symbol = getCurrencySymbol(currency);
            const label = dataItems.filter((item) => item.value === dataItem)[0]
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
      dataItems.filter((item) => item.value === dataItem)[0].colorRGB
    }, ${opacity})`;

  const chartData: ChartData<"line"> = {
    labels: labels,
    datasets: [
      {
        data: dataValues,
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
    <Container
      maxWidth="lg"
      sx={{
        // width: { sm: "100%", md: "75%", lg: "75%" },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        mt: 3,
        p: 5,
      }}
    >
      <Box
        sx={{
          display: "flex",
          mt: 3,
          justifyContent: "flex-start",
          alignItems: "center",
          gap: "0.5rem",
          flexWrap: "wrap",
        }}
      >
        {dataItems.map((item) => (
          <SelectButton
            key={item.value}
            name={item.label}
            value={item.value}
            selected={item.value === dataItem}
            colorRGB={`${item.colorRGB}`}
            handleValueSelect={handleSelectDataItem}
          />
        ))}
      </Box>
      <Box
        sx={{
          display: "flex",
          mt: 3,
          justifyContent: "flex-start",
          alignItems: "center",
          gap: "0.5rem",
          flexWrap: "wrap",
        }}
      >
        {chartDays.map((day) => (
          <SelectButton
            key={day.value}
            name={day.label}
            value={days}
            selected={day.value === days}
            colorRGB="255,215,0"
            handleValueSelect={handleSelectDays}
          />
        ))}
      </Box>
      {/* {!historical || isLoading ? (
        <CircularProgress sx={{ color: "gold" }} size={250} thickness={3} />
      ) : ( */}

      <Box
        sx={{
          width: "100%",
          height: "500px",
        }}
      >
        <Chart
          type="line"
          data={chartData}
          options={options}
          plugins={[verticalLineOnHover]}
        />
      </Box>
      {/* )} */}
    </Container>
  );
};

export default CoinChart;
