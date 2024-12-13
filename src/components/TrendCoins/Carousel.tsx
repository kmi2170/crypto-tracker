"use client";

import Link from "next/link";

import { useQuery } from "@tanstack/react-query";
import { styled } from "@mui/material/styles";

import { configForUseQuery, fetchTrendCoins } from "../../lib/fetchFunctions";
import { TrendCoin } from "../../api/types";
import CarouselItem from "./CarouselItem";

import AliceCarousel from "react-alice-carousel";
import { useCurrency } from "../../context/hook";
import CarouselItemSkeletons from "./CarouselItemSkeletons";

import "react-alice-carousel/lib/alice-carousel.css";

export const CarouselWrapper = styled("div")({
  marginLeft: "0.5rem",
  marginRight: "0.5rem",
  height: "11.25rem",
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
  const { currency } = useCurrency();

  const { data: trending, isLoading } = useQuery({
    queryKey: ["trending"],
    queryFn: () => fetchTrendCoins(),
    ...configForUseQuery,
  });

  const items = trending?.coins?.map(({ item }: { item: TrendCoin }) => {
    return (
      <Link key={item.id} href={`/coins/${item.id}`}>
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
