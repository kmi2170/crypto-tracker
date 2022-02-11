import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image"
import axios from "axios";
import Box from "@mui/material/Box";
import { CryptoState } from "../../context/CryptoContext";
import { TrendingCoins } from "../../config/api";
import AliceCarousel from "react-alice-carousel";

export const numberWithComma = (x: number) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Carousel = () => {
  const [trending, setTrending] = useState<string[]>([])
  const { currency, symbol } = CryptoState()

  const fetchTrendingCoins = async () => {
    try {
      const { data } = await axios.get(TrendingCoins(currency))

      setTrending(data)
    } catch (error) {
      console.error(error)
    }
  }

  console.log(trending)

  useEffect(() => {
    fetchTrendingCoins()
  }, [currency])

  const items = trending.map((coin: any) => {
    const profit = coin?.price_change_percentage_24h >= 0

    return (
      <Link key={coin.id} href={`/coins/${coin.id}`} >
        <a>
          <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            cursor: "pointer",
            textTransform: "uppercase",
            color: "white",
          }}>
            <Image
              src={coin?.image}
              alt={coin.name}
              width="80"
              height="80"
            />
            <span>
              {coin?.symbol}
              <span style={{
                color: profit ? "rgb(14, 203, 129)" : "red",
                fontWeight: "bold",
              }}>
                {profit && "+"} {coin?.price_change_percentage_24h?.toFixed(2)}%
              </span>
            </span>

            <span style={{ fontSize: 22 }}>
              {symbol} {numberWithComma(coin?.current_price.toFixed(2))}
            </span>
          </Box>
        </a>
      </Link>
    )
  })

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    }
  }

  return (
    <Box sx={{
      height: "50%",
      display: "flex",
      alignItems: "center",
    }}>
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
    </Box>
  )
}

export default Carousel
