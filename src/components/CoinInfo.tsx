import axios from "axios";
import { useEffect, useState } from "react";
import { HistoricalChart } from "../config/api-endpoints";
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
import { CryptoState } from "../context/CryptoContext";
import { chartDays } from "../config/chartDays";
import { configForUseQuery } from "../lib/fetchFunctions";
import { useQuery } from "@tanstack/react-query";
import { Historical } from "../context/types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const fetchFn = async (id: string, currency: string, days: number) => {
  const { data } = await axios.get(
    `/api/historical?id=${id}&currency=${currency}&days=${days}`
  );
  return data;
};

type CoinInfoProps = {
  id: string;
  currency: string;
};

const CoinInfo = (props: CoinInfoProps) => {
  const { id, currency } = props;
  // const [histricalData, setHistricalDate] = useState<[]>([]);
  const [days, setDays] = useState<number>(1);
  // const [isLoading, setIsLoading] = useState<boolean>(false);

  // const { currency } = CryptoState();

  const { data: historical, isLoading } = useQuery<Historical>({
    queryKey: ["history", { id, currency, days }],
    queryFn: () => fetchFn(id, currency, days),
    ...configForUseQuery,
  });

  const labels = historical?.prices.map((data) => {
    return data[0];
  });
  const prices = historical?.prices.map((data) => data[0]);

  // const fetchHistricalData = async () => {
  //   try {
  //     const { data } = await axios.get(
  //       HistoricalChart(coin.id, days, currency)
  //     );

  //     setIsLoading(false);
  //     setHistricalDate(data.prices);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // useEffect(() => {
  //   fetchHistricalData();
  // }, [currency, days]);

  const options: ChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    elements: {
      point: {
        radius: 1,
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
        <>
          <Chart
            type="line"
            data={{
              // labels: historical.prices.map((coin: any) => {
              //   const date = new Date(coin[0]);
              //   const time =
              //     date.getHours() > 12
              //       ? `${date.getHours() - 12}:${date.getMinutes()} PM`
              //       : `${date.getHours()}:${date.getMinutes()} AM`;
              //   return days === 1 ? time : date.toLocaleString();
              // })
              labels,
              datasets: [
                {
                  data: historical.prices.map((coin: any) => coin[1]),
                  label: `Price ( Past ${days} Days ) in ${currency}`,
                  borderColor: "#EEBC1D",
                },
              ],
            }}
            options={options}
          />
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
        </>
      )}
    </Container>
  );
};

export default CoinInfo;
