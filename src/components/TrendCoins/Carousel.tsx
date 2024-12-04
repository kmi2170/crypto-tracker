"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";

import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";

import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

import {
  configForUseQuery,
  fetchTrendCoins,
  fetchTrendCoinsDummy,
} from "../../lib/fetchFunctions";
import { Coin, Currencies } from "../../context/types";
import { formatNumber } from "../../lib/formatNumber";
import { getCurrencySymbol } from "../../lib/getCurrencySymbol";
import { CurrenciesDummy } from "../../config/chart/dummyData/SingleCoin";

const responsive = {
  0: {
    items: 3,
  },
  400: {
    items: 4,
  },
  512: {
    items: 6,
  },
  1080: {
    items: 8,
  },
};

const Carousel = () => {
  const searchParams = useSearchParams();
  const currentSearchParams = new URLSearchParams(searchParams).toString();
  const currency = (searchParams.get("currency") || "usd") as Currencies;

  const { data: trending } = useQuery({
    queryKey: ["trending", currency],
    queryFn: () => fetchTrendCoinsDummy(currency),
    ...configForUseQuery,
  });

  const items = trending?.map((coin: Coin) => {
    return (
      <Link key={coin.id} href={`/coins/${coin.id}?${currentSearchParams}`}>
        <DisplayItem coin={coin} currency={currency} />
      </Link>
    );
  });

  return (
    <AliceCarousel
      mouseTracking
      infinite
      autoPlayInterval={10000}
      animationDuration={1500}
      // disableDotsControls
      disableButtonsControls
      responsive={responsive}
      autoPlay
      items={items}
      // autoHeight
      // autoWidth
    />
  );
};

export default Carousel;

const ItemWrapper = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  textTransform: "uppercase",
  color: "white",
});

type DisplayItemProps = {
  coin: Coin;
  currency: Currencies;
};

const DisplayItem = ({ coin, currency }: DisplayItemProps) => {
  const isPriceUp = coin?.price_change_percentage_24h >= 0;
  return (
    <ItemWrapper>
      <Typography
        variant="subtitle2"
        align="center"
        sx={{ color: "black", fontWeight: "bold" }}
      >
        {coin?.symbol}
      </Typography>
      <Image src={coin?.image} alt={coin.name} width="35" height="35" />
      <Typography
        variant="subtitle1"
        align="center"
        sx={{ color: "black", fontWeight: "bold" }}
      >
        {getCurrencySymbol(currency)}
        {formatNumber(+coin?.current_price.toFixed(3))}
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        sx={{
          color: isPriceUp ? "rgb(14, 203, 129)" : "red",
          fontWeight: "bold",
        }}
      >
        {isPriceUp && "+"}
        {coin?.price_change_percentage_24h?.toFixed(2)}%
      </Typography>
    </ItemWrapper>
  );
};
