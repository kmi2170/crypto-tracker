import type { NextPage } from 'next'
import Image from "next/image"
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import ReactHtmlParser from "react-html-parser";
import axios from 'axios'

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";

import { SingleCoin } from '../../config/api'
import { CryptoState } from '../../context/CryptoContext'
import CoinInfo from '../../components/CoinInfo';
import { numberWithComma } from '../../components/Banner/Carousel';

const Coins: NextPage = () => {
  const router = useRouter()
  const { id } = router.query

  const [coin, setCoin] = useState<any>({})
  const { currency, symbol } = CryptoState()

  const fetchCoin = async () => {
    try {
      const { data } = await axios.get(SingleCoin(id as string))

      setCoin(data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (id) fetchCoin()
  }, [id, currency])

  return (
    !coin?.image ? (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <LinearProgress sx={{ backgroundColor: "gold" }} />
      </Box>
    ) : (
      <Box sx={{
        display: "flex",
        flexDirection: { xs: "column",sm:"column", md: "row" },
        alignItems: { xs: "center", md: "" },
      }}>
        <Box sx={{
          width: { xs: "100%", lg: "30%" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 3,
          borderRight: "2px solid gray",
        }}>
          <Image
            src={coin?.image.large}
            alt={coin?.name}
            width="200"
            height="200"
          />
          <Typography variant="h3" sx={{ fontWeight: "bold", mt: 2 }}>
            {coin?.name}
          </Typography>
          <Typography variant="subtitle1"
            sx={{ width: "100%", p: 3, pb: 2, pt: 0, textAlign: "justify" }}>
            {ReactHtmlParser(coin?.description.en.split(". ")[0])}
          </Typography>
          <Box sx={{
            alignSelf: "start",
            p: 3, pt: 1,
            width: "100%",
            display: "flex",
            flexDirection:"column",
            justifyContent: { xs: "flex-start", sm: "center", md: "flex-start"},
            alignItems: { xs: "start", sm: "center", md: "start" },
          }}>
            <Box sx={{ display: "flex" }}>
              <Typography variant="h6">
                Current Price:
              </Typography>
              &nbsp; &nbsp;
              <Typography variant="h6">
                {symbol}{" "}
                {numberWithComma(coin?.market_data.current_price[currency.toLowerCase()])}
              </Typography>
            </Box>
            <Box sx={{ display: "flex" }}>
              <Typography variant="h6">
                Market Cap:
              </Typography>
              &nbsp; &nbsp;
              <Typography variant="h5">
                {symbol}{" "}
                {numberWithComma(
                  coin?.market_data.market_cap[currency.toLowerCase()]
                    .toString().slice(0, 6)
                )}
                M
              </Typography>
            </Box>
            <Box sx={{ display: "flex" }}>
              <Typography variant="h5">
                Rank:
              </Typography>
              &nbsp; &nbsp;
              <Typography variant="h5">
                {coin?.market_cap_rank}
              </Typography>
            </Box>
          </Box>
        </Box>
        <CoinInfo coin={coin} />
      </Box>
    )
  )
}

export default Coins
