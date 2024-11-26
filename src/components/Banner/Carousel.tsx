"use client";

import Link from "next/link";
import Image from "next/image";
import { styled } from "@mui/material/styles";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { CryptoState } from "../../context/CryptoContext";
import { configForUseQuery } from "../../lib/fetchFunctions";
import { Coin } from "../../context/types";
import { useSearchParams } from "next/navigation";

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

const fetchFn = async (currency: string) => {
  const { data } = await axios.get(`/api/trend-list?currency=${currency}`);
  return data;
};

const Carousel = () => {
  const searchParams = useSearchParams();
  const currency = searchParams.get("currency") || "usd";

  const symbol = currency.toUpperCase();
  console.log({ currency });
  // const { currency = "usd", symbol } = CryptoState();

  const { data: trending } = useQuery<Coin[]>({
    queryKey: ["trending", currency],
    queryFn: () => fetchFn(currency),
    ...configForUseQuery,
  });

  if (!trending) return;

  const items = trending?.map((coin: Coin) => {
    const isPriceUp = coin?.price_change_percentage_24h >= 0;

    return (
      <Link key={coin.id} href={`/coins/${coin.id}`}>
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
