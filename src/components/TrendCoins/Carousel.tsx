"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";

import { useSuspenseQuery } from "@tanstack/react-query";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

import { configForUseQuery, fetchTrendCoins } from "../../lib/fetchFunctions";
import { Currencies, TrendCoin } from "../../api/types";
import CarouselItem from "./CarouselItem";
import LoadingIndicator from "../LoadingIndicator";

import "react-alice-carousel/lib/alice-carousel.css";

const AliceCarousel = dynamic(() => import("react-alice-carousel"), {
  ssr: false,
  loading: () => (
    <Box
      sx={{
        height: "7rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <LoadingIndicator />
    </Box>
  ),
});

// Higher-order component to pass props to the loading component
// const withDynamicLoading = (path: string, Component: ComponentType<any>) => {
//   return dynamic(() => import(path), {
//     loading: (props) => <Component {...props} />,
//     ssr: false,
//   });
// };
// const AliceCarousel = withDynamicLoading(
//   "react-alice-carousel",
//   CarouselItemSkeletons
// );

// export default withDynamicLoading;

const CarouselWrapper = styled("div")({
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
  const searchParams = useSearchParams();
  const currentSearchParams = new URLSearchParams(searchParams).toString();
  const currency = (searchParams.get("currency") || "usd") as Currencies;

  const { data: trending, isLoading } = useSuspenseQuery({
    queryKey: ["trending"],
    queryFn: () => fetchTrendCoins(),
    ...configForUseQuery,
  });

  if (!trending) return;

  const items = trending?.coins?.map(({ item }: { item: TrendCoin }) => {
    return (
      <Link key={item.id} href={`/coins/${item.id}?${currentSearchParams}`}>
        <CarouselItem coin={item} currency={currency} />
      </Link>
    );
  });

  return (
    <CarouselWrapper>
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
    </CarouselWrapper>
  );
};

export default Carousel;
