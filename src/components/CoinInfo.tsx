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
} from "chart.js";

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
  const [dataItem, setDataItem] = useState<DataItemsType>("prices");

  const { data: historical, isLoading } = useQuery({
    queryKey: ["history", { id, currency, days }],
    // queryFn: () => fetchHistorical(id, currency, days),
    queryFn: () => fetchHistoricalDummy(id, currency, days),
    ...configForUseQuery,
  });

  const labels = historical?.[dataItem].map((data) => {
    const dt = days === 1 ? getDayTime(data[0]) : getDate(data[0]);
    return dt;
  });
  const prices = historical?.[dataItem].map((data) => data[1]);

  const handleSelectDays = useCallback((value: number) => setDays(value), []);
  const handleSelectDataItem = useCallback(
    (value: DataItemsType) => setDataItem(value),
    []
  );

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
        {dataItems.map((item) => (
          <SelectButton
            key={item.value}
            name={item.label}
            value={item.value}
            selected={item.value === dataItem}
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
