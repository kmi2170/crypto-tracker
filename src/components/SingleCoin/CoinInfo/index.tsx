"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

import {
  configForUseQuery,
  fetchSingleCoin,
} from "../../../lib/fetchFunctions";
import { getCurrencySymbol } from "../../../lib/getCurrencySymbol";
import { formatNumber } from "../../../lib/formatNumber";
import AddToAndRemoveFromWatchListButton from "./AddToAndRemoveFromWatchListButton";
import { useCurrency } from "../../../context/hook";

const CoinNameWrapper = styled("div")({
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

const CoinInfo = () => {
  const params = useParams();
  const id = params.id as string;
  const { currency } = useCurrency();

  const { data: coin, isLoading } = useQuery({
    queryKey: ["single-coin", { id }],
    queryFn: () => fetchSingleCoin(id),
    ...configForUseQuery,
  });

  if (isLoading || !coin) return;

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
      <CoinNameWrapper>
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
      </CoinNameWrapper>
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

      <AddToAndRemoveFromWatchListButton
        id={coin?.id}
        name={coin?.name}
        imgUrl={coin?.image?.thumb}
        market_cap_rank={coin?.market_cap_rank}
      />
    </Box>
  );
};

export default CoinInfo;
