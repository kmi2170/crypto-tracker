// import { useState, useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";
import { makeStyles } from "@mui/styles";
import AliceCarousel from "react-alice-carousel";
import { useQuery } from "react-query";

import { CryptoState } from "../../context/CryptoContext";
import { fetchTrendCoins, configForUseQuery } from "../../lib/fetchFunctions";
import { Coin } from "../../context/types";
import axios from "axios";

const useStyles = makeStyles(() => ({
  carousel: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    textTransform: "uppercase",
    color: "white",
  },
}));

export const numberWithComma = (x: number) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const fetchFn = async (currency: string) => {
  const { data } = await axios.get(
    `/api/trend-list/route?currency=${currency}`
  );
  return data;
};

const Carousel = () => {
  const classes = useStyles();

  const { currency, symbol } = CryptoState();

  const { data: trending } = useQuery<Coin[]>(
    ["trending", currency],
    () => fetchFn(currency),
    configForUseQuery
  );

  if (!trending) return;

  const items = trending?.map((coin: Coin) => {
    const isProfit = coin?.price_change_percentage_24h >= 0;

    return (
      <Link key={coin.id} href={`/coins/${coin.id}`}>
        <div className={classes.carousel}>
          <Image src={coin?.image} alt={coin.name} width="80" height="80" />
          <span>
            {coin?.symbol}
            <span
              style={{
                color: isProfit ? "rgb(14, 203, 129)" : "red",
                fontWeight: "bold",
              }}
            >
              {isProfit && "+"} {+coin?.price_change_percentage_24h?.toFixed(2)}
              %
            </span>
          </span>

          <span style={{ fontSize: 22 }}>
            {symbol} {numberWithComma(+coin?.current_price.toFixed(2))}
          </span>
        </div>
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
  };

  return (
    <div style={{ height: "50%", display: "flex", alignItems: "center" }}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={10000}
        animationDuration={1500}
        disableDotsControls
        // disableButtonsControls
        responsive={responsive}
        autoPlay
        items={items}
      />
    </div>
  );
};

export default Carousel;
