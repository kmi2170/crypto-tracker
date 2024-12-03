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
import { Coin } from "../../context/types";
import { formatNumber } from "../../lib/formatNumber";
import { getCurrencySymbol } from "../../lib/getCurrencySymbol";

const CarouselWrapper = styled(Paper)({
  height: "50%",
  margin: "auto",
  paddingTop: "2rem",
  paddingBottom: "1rem",
  maxWidth: "1000px",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
});

const ItemWrapper = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  textTransform: "uppercase",
  color: "white",
});

const Carousel = () => {
  const searchParams = useSearchParams();
  const currentSearchParams = new URLSearchParams(searchParams).toString();
  const currency = searchParams.get("currency") || "usd";

  const { data: trending } = useQuery({
    queryKey: ["trending", currency],
    queryFn: () => fetchTrendCoinsDummy(currency),
    ...configForUseQuery,
  });

  // if (!trending) return;

  const items = trending?.map((coin: Coin) => {
    const isPriceUp = coin?.price_change_percentage_24h >= 0;
    console.log(coin.symbol);

    return (
      <Link key={coin.id} href={`/coins/${coin.id}?${currentSearchParams}`}>
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
      </Link>
    );
  });

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

  return (
    <>
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
    </>
  );
};

export default Carousel;
