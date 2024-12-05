"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

import { styled } from "@mui/material/styles";

import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

import {
  configForUseQuery,
  fetchTrendCoins,
  fetchTrendCoinsDummy,
} from "../../lib/fetchFunctions";
import { Coin, Currencies } from "../../context/types";
import { CurrenciesDummy } from "../../config/chart/dummyData/SingleCoin";
import CarouselItem from "./CarouselItem";
import CarouselItemSkeletons from "./CarouselItemSkeletons";

const CarouselWrapper = styled("div")({
  marginLeft: "0.5rem",
  marginRight: "0.5rem",
  height: "11rem",
});

const responsive = {
  0: {
    items: 3,
  },
  600: {
    items: 5,
  },
  900: {
    items: 8,
  },
  1200: {
    items: 8,
  },
};

const Carousel = () => {
  const searchParams = useSearchParams();
  const currentSearchParams = new URLSearchParams(searchParams).toString();
  const currency = (searchParams.get("currency") || "usd") as Currencies;

  const { data: trending, isLoading } = useQuery({
    queryKey: ["trending", currency],
    queryFn: () => fetchTrendCoinsDummy(currency),
    ...configForUseQuery,
  });

  const items = trending?.map((coin: Coin) => {
    return (
      <Link key={coin.id} href={`/coins/${coin.id}?${currentSearchParams}`}>
        <CarouselItem coin={coin} currency={currency} />
      </Link>
    );
  });

  return (
    <CarouselWrapper>
      {isLoading ? (
        <CarouselItemSkeletons />
      ) : (
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
      )}
    </CarouselWrapper>
  );
};

export default Carousel;
