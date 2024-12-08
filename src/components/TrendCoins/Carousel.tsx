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
import { Currencies, TrendCoin } from "../../context/types";
import { CurrenciesDummy } from "../../config/chart/dummyData/SingleCoin";
import CarouselItem from "./CarouselItem";
import CarouselItemSkeletons from "./CarouselItemSkeletons";

const CarouselWrapper = styled("div")({
  marginLeft: "0.5rem",
  marginRight: "0.5rem",
  height: "11.5rem",
});

const responsive = {
  0: {
    items: 4,
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
    queryKey: ["trending"],
    queryFn: () => fetchTrendCoins(),
    // queryFn: () => fetchTrendCoinsDummy(currency),
    ...configForUseQuery,
  });

  const items = trending?.coins?.map(({ item }: { item: TrendCoin }) => {
    return (
      <Link key={item.id} href={`/coins/${item.id}?${currentSearchParams}`}>
        <CarouselItem coin={item} currency={currency} />
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
        />
      )}
    </CarouselWrapper>
  );
};

export default Carousel;
