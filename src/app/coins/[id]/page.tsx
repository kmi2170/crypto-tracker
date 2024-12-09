"use client";

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
  fetchSingleCoinDummy,
} from "../../../lib/fetchFunctions";
import useLocalStorage from "../../../hooks/useLocalStorage";
import { getCurrencySymbol } from "../../../lib/getCurrencySymbol";
import { formatNumber } from "../../../lib/formatNumber";
import { CurrenciesDummy } from "../../../config/chart/dummyData/SingleCoin";
import { Currencies } from "../../../context/types";

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

  const { value: watchList, setValueToLocalStorage } = useLocalStorage(
    "crypto-tracker-watch-list",
    [] as string[]
  );

  if (!coin) return;

  const inWatchList = watchList.some((id) => id === coin?.id);

  const addToWatchList = (id: string) => {
    const newWatchList = [id, ...watchList];
    setValueToLocalStorage("crypto-tracker-watch-list", newWatchList);
  };

  const removeFromWatchList = (id: string) => {
    const newWatchList = watchList.filter((_id) => id !== _id);
    setValueToLocalStorage("crypto-tracker-watch-list", newWatchList);
  };

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

      <Button
        variant="outlined"
        sx={{
          mb: "0.25rem",
          width: "16rem",
          color: "black",
          fontWeight: "bold",
          border: "none",
          borderRadius: "20px",
          backgroundColor: inWatchList ? "pink" : "gold",
        }}
        onClick={() =>
          inWatchList ? removeFromWatchList(id) : addToWatchList(id)
        }
      >
        {inWatchList ? "Remove from Watchlist" : "Add to Watchlist"}
      </Button>

      <CoinChart id={id} currency={currency} />
    </Box>
  );
};

export default Coin;
