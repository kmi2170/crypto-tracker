import { useCallback, useState } from "react";
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
} from "chart.js";

import SelectButton from "./SelectButton";
import { chartDays } from "../config/chartDays";
import {
  configForUseQuery,
  fetchCoinList,
  fetchHistorical,
  fetchHistoricalDummy,
} from "../lib/fetchFunctions";
import { useQuery } from "@tanstack/react-query";
import { Historical } from "../context/types";
import { getDate, getDayTime } from "../lib/dateTime";
import { createExternalTooltipHandler } from "../config/chart/tooltip";
import { verticalLineOnHover } from "../config/chart/plugins";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type CoinInfoProps = {
  id: string;
  currency: string;
};

const CoinInfo = (props: CoinInfoProps) => {
  const { id, currency } = props;

  const [days, setDays] = useState<number>(1);

  const { data: historical, isLoading } = useQuery({
    queryKey: ["history", { id, currency, days }],
    // queryFn: () => fetchHistorical(id, currency, days),
    queryFn: () => fetchHistoricalDummy(id, currency, days),
    ...configForUseQuery,
  });

  const labels = historical?.prices.map((data) => {
    const dt = days === 1 ? getDayTime(data[0]) : getDate(data[0]);
    return dt;
  });
  const prices = historical?.prices.map((data) => data[1]);

  const handleSelectDays = useCallback((days: number) => setDays(days), []);

  const externalTooltipHandler = createExternalTooltipHandler(currency);

  const options: ChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    scales: {
      x: {
        ticks: {},
      },
      y: {
        ticks: {},
      },
    },
    plugins: {
      tooltip: {
        enabled: false,
        position: "nearest",
        external: externalTooltipHandler,
      },
      legend: {
        display: false,
      },
    },
  };

  return (
    <Container
      sx={{
        width: { sm: "100%", md: "75%", lg: "75%" },
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
        {chartDays.map((day) => (
          <SelectButton
            key={day.value}
            name={day.label}
            days={days}
            selected={day.value === days}
            onClick={handleSelectDays}
          />
        ))}
      </Box>
      {/* {!historical || isLoading ? (
        <CircularProgress sx={{ color: "gold" }} size={250} thickness={3} />
      ) : ( */}

      <Box
        sx={{
          width: "100%",
        }}
      >
        <Chart
          type="line"
          data={{
            labels,
            datasets: [
              {
                data: prices,
                borderColor: "goldenrod",
                // borderColor: "#EEBC1D",
                borderWidth: 1,
                pointRadius: 0,
                pointHoverBackgroundColor: "pink",
                // backgroundColor: "rgba(0, 0, 0, 0)",
              },
            ],
          }}
          options={options}
          plugins={[verticalLineOnHover]}
        />
      </Box>
      {/* )} */}
    </Container>
  );
};

export default CoinInfo;
