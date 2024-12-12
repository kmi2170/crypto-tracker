"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

import CoinChart from "../../../components/CoinChart";
import {
  configForUseQuery,
  fetchSingleCoin,
} from "../../../lib/fetchFunctions";
import useLocalStorage from "../../../hooks/useLocalStorage";
import { getCurrencySymbol } from "../../../lib/getCurrencySymbol";
import { formatNumber } from "../../../lib/formatNumber";
import { Currencies, WatchList } from "../../../context/types";

const TitleWrapper = styled("div")({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
});

const PricesWrapper = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

const Coin = () => {
  const params = useParams();
  const id = params.id as string;
  const searchParams = useSearchParams();
  const currency = (searchParams.get("currency") || "usd") as Currencies;

  const { data: coin } = useQuery({
    queryKey: ["single-coin", { id }],
    queryFn: () => fetchSingleCoin(id),
    ...configForUseQuery,
  });

  if (!coin) return;

  return (
    <Box
      sx={{
        mt: "1rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TitleWrapper>
        <Image
          src={coin?.image.small}
          alt={coin?.name}
          width="35"
          height="35"
        />
        <Typography variant="h4" sx={{ fontWeight: "bold", ml: "0.5rem" }}>
          {coin?.name}
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: "bold", ml: "0.5rem" }}>
          ({coin?.symbol})
        </Typography>
      </TitleWrapper>
      <PricesWrapper sx={{ mt: "1rem", mb: "1rem" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Current Price: {getCurrencySymbol(currency)}
          {formatNumber(coin?.market_data.current_price[currency], 3)}
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Market Cap: {getCurrencySymbol(currency)}
          {formatNumber(coin?.market_data.market_cap[currency], 2)}
        </Typography>
        <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
          Rank: {coin?.market_cap_rank}
        </Typography>
      </PricesWrapper>

      <AddToAndRemoveFromWatchList
        id={id}
        name={coin?.name}
        imgUrl={coin?.image.thumb}
        market_cap_rank={coin?.market_cap_rank}
      />

      <CoinChart id={id} currency={currency} />
    </Box>
  );
};

export default Coin;

type AddToAndRemoveFromWatchListProps = {
  id: string;
  name: string;
  imgUrl: string;
  market_cap_rank: number;
};

const key = process.env.NEXT_PUBLIC_LOCAL_STORAGE_WATCH_LIST_KEY as string;

const AddToAndRemoveFromWatchList = (
  props: AddToAndRemoveFromWatchListProps
) => {
  const { id, name, imgUrl, market_cap_rank } = props;
  const [watchList, setWatchList] = useState<WatchList[]>([]);
  const { getItemFromLocalStorage, setItemToLocalStorage } = useLocalStorage(
    key,
    [] as WatchList[]
  );

  const getWatchList = () => {
    const storedValue = getItemFromLocalStorage();
    setWatchList(storedValue);
  };

  useEffect(() => {
    getWatchList();
  }, []);

  useEffect(() => {
    const handleStorage = () => {
      getWatchList();
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const inWatchList = watchList?.some(({ id: _id }) => id === _id);

  const addToWatchList = (
    id: string,
    name: string,
    imgUrl: string,
    market_cap_rank: number
  ) => {
    const existInList = watchList?.some(({ id: _id }) => id === _id);
    if (existInList) return;
    const newWatchList = [{ id, name, imgUrl, market_cap_rank }, ...watchList];
    setItemToLocalStorage(newWatchList);
  };

  const removeFromWatchList = (_id: string) => {
    const newWatchList = watchList.filter(({ id }) => id !== _id);
    setItemToLocalStorage(newWatchList);
  };

  return (
    <Button
      variant="outlined"
      sx={(theme) => ({
        mb: "0.25rem",
        width: "16rem",
        color: "black",
        fontWeight: "bold",
        border: "none",
        borderRadius: "20px",
        backgroundColor: inWatchList
          ? theme.palette.secondary.light
          : theme.palette.secondary.main,
      })}
      onClick={() =>
        inWatchList
          ? removeFromWatchList(id)
          : addToWatchList(id, name, imgUrl, market_cap_rank)
      }
    >
      {inWatchList ? "Remove from Watch List" : "Add to Watch List"}
    </Button>
  );
};
