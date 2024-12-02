import { useCallback, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import SelectButton from "./SelectButton";
import {
  chartDays,
  dataItems,
  DataItemsType,
} from "../../config/chart/chartButtons";
import {
  configForUseQuery,
  fetchHistorical,
  fetchHistoricalDummy,
} from "../../lib/fetchFunctions";
import { Historical } from "../../context/types";
import { getDate, getTime } from "../../lib/dateTime";
import { getCurrencySymbol } from "../../lib/getCurrencySymbol";
import { formatNumber } from "../../lib/formatNumber";
import ChartMain from "./ChartMain";

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

  const chartLabels = historical?.[dataItem].map((data) => {
    const dt = days === 1 ? getTime(data[0]) : getDate(data[0]);
    return dt;
  }) as string[];
  const chartValues = historical?.[dataItem].map((data) => data[1]) as number[];

  const handleSelectDays = useCallback((value: number) => setDays(value), []);
  const handleSelectDataItem = useCallback(
    (value: DataItemsType) => setDataItem(value),
    []
  );

  return (
    <Container
      maxWidth="lg"
      sx={{
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

      <ChartMain
        currency={currency}
        itemName={dataItem}
        labels={chartLabels}
        values={chartValues}
      />
    </Container>
  );
};

export default CoinChart;
