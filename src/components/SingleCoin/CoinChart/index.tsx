"use client";

import { useCallback, useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";

import { DataItemValue, DaysValue } from "../../../config/chart/chartButtons";
import {
  configForUseQuery,
  fetchHistorical,
} from "../../../lib/fetchFunctions";
import { Currencies } from "../../../api/types";
import { getDate, getTime } from "../../../lib/dateTime";
import ChartMain from "./ChartMain";
import SelectButtons from "./SelectButtons";
import { useParams, useSearchParams } from "next/navigation";

const CoinChart = () => {
  const params = useParams();
  const id = params.id as string;
  const searchParams = useSearchParams();
  const currency = (searchParams.get("currency") || "usd") as Currencies;

  const [days, setDays] = useState<DaysValue>(1);
  const [itemName, setItemName] = useState<DataItemValue>("prices");

  const { data: historical, isLoading } = useSuspenseQuery({
    queryKey: ["history", { id, currency, days }],
    queryFn: () => fetchHistorical(id, currency, days),
    ...configForUseQuery,
  });

  const chartLabels = historical?.[itemName].map((data) => {
    const dt = days === 1 ? getTime(data[0]) : getDate(data[0]);
    return dt;
  }) as string[];
  const chartValues = historical?.[itemName].map((data) => data[1]) as number[];

  const handleSelectDays = useCallback(
    (value: DaysValue) => setDays(value),
    []
  );
  const handleSelectItemName = useCallback(
    (value: DataItemValue) => setItemName(value),
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
