import { useCallback, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { DataItemsType } from "../../config/chart/chartButtons";
import {
  configForUseQuery,
  fetchHistorical,
  fetchHistoricalDummy,
} from "../../lib/fetchFunctions";
import { Currencies, Historical } from "../../context/types";
import { getDate, getTime } from "../../lib/dateTime";
import ChartMain from "./ChartMain";
import SelectButtons from "./SelectButtons";

type CoinChartProps = {
  id: string;
  currency: Currencies;
};

const CoinChart = (props: CoinChartProps) => {
  const { id, currency } = props;

  const [days, setDays] = useState<number>(1);
  const [itemName, setItemName] = useState<DataItemsType>("prices");

  const { data: historical, isLoading } = useQuery({
    queryKey: ["history", { id, currency, days }],
    // queryFn: () => fetchHistorical(id, currency, days),
    queryFn: () => fetchHistorical(id, currency, days),
    ...configForUseQuery,
  });

  const chartLabels = historical?.[itemName].map((data) => {
    const dt = days === 1 ? getTime(data[0]) : getDate(data[0]);
    return dt;
  }) as string[];
  const chartValues = historical?.[itemName].map((data) => data[1]) as number[];

  const handleSelectDays = useCallback((value: number) => setDays(value), []);
  const handleSelectItemName = useCallback(
    (value: DataItemsType) => setItemName(value),
    []
  );

  return (
    <>
      <SelectButtons
        days={days}
        itemName={itemName}
        handleSelectItemName={handleSelectItemName}
        handleSelectDays={handleSelectDays}
      />
      <ChartMain
        currency={currency}
        itemName={itemName}
        labels={chartLabels}
        values={chartValues}
      />
    </>
  );
};

export default CoinChart;
