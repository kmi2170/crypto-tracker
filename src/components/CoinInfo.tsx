import axios from "axios";
import { useCallback, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
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
import { configForUseQuery, fetchHistorical } from "../lib/fetchFunctions";
import { useQuery } from "@tanstack/react-query";
import { Historical } from "../context/types";
import { getDate, getDayTime } from "../lib/dateTime";

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

  const { data: historical, isLoading } = useQuery<Historical>({
    queryKey: ["history", { id, currency, days }],
    queryFn: () => fetchHistorical(id, currency, days),
    ...configForUseQuery,
  });

  const labels = historical?.prices.map((data) => {
    const dt = days === 1 ? getDayTime(data[0]) : getDate(data[0]);
    return dt;
  });
  const prices = historical?.prices.map((data) => data[1]);

  const handleSelectDays = useCallback((days: number) => setDays(days), []);

  const options: ChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    elements: {
      point: {
        radius: 1,
      },
    },
    plugins: {
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
      {!historical || isLoading ? (
        <CircularProgress sx={{ color: "gold" }} size={250} thickness={3} />
      ) : (
        <Chart
          type="line"
          data={{
            labels,
            datasets: [
              {
                data: prices,
                borderColor: "#EEBC1D",
              },
            ],
          }}
          options={options}
        />
      )}
      <Box
        sx={{
          display: "flex",
          mt: 3,
          justifyContent: "space-around",
          width: "100%",
        }}
      >
        {chartDays.map((day) => (
          <SelectButton
            key={day.value}
            onClick={() => {
              setDays(day.value);
            }}
            selected={day.value === days}
          >
            {day.label}
          </SelectButton>
        ))}
      </Box>
    </Container>
  );
};

export default CoinInfo;
