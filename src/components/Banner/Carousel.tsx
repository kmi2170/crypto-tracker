"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";

import { styled } from "@mui/material/styles";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

import { configForUseQuery, fetchTrendCoins } from "../../lib/fetchFunctions";
import { Coin } from "../../context/types";

const CarouselWrapper = styled("div")({
  height: "50%",
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

export const numberWithComma = (x: number) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const Carousel = () => {
  const searchParams = useSearchParams();
  const currentSearchParams = new URLSearchParams(searchParams).toString();
  const currency = searchParams.get("currency") || "usd";

  const symbol = currency.toUpperCase();
  // const { currency = "usd", symbol } = CryptoState();

  const { data: trending } = useQuery<Coin[]>({
    queryKey: ["trending", currency],
    queryFn: () => fetchTrendCoins(currency),
    ...configForUseQuery,
  });

  if (!trending) return;

  const items = trending?.map((coin: Coin) => {
    const isPriceUp = coin?.price_change_percentage_24h >= 0;

    return (
      <Link key={coin.id} href={`/coins/${coin.id}?${currentSearchParams}`}>
        <ItemWrapper>
          <Image src={coin?.image} alt={coin.name} width="80" height="80" />
          <span>
            {coin?.symbol}
            <span
              style={{
                color: isPriceUp ? "rgb(14, 203, 129)" : "red",
                fontWeight: "bold",
              }}
            >
              {isPriceUp && "+"}{" "}
              {+coin?.price_change_percentage_24h?.toFixed(2)}%
            </span>
          </span>

          <span style={{ fontSize: 22 }}>
            {symbol} {numberWithComma(+coin?.current_price.toFixed(2))}
          </span>
        </ItemWrapper>
      </Link>
    );
  });

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
    1024: {
      items: 8,
    },
  };

  return (
    <CarouselWrapper>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={10000}
        animationDuration={1500}
        // disableDotsControls
        // disableButtonsControls
        responsive={responsive}
        autoPlay
        items={items}
        // autoHeight
        // autoWidth
      />
    </CarouselWrapper>
  );
};

export default Carousel;
