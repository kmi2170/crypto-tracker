"use client";

import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

import CoinChart from "../../../components/CoinChart";
import {
  configForUseQuery,
  fetchSingleCoin,
} from "../../../lib/fetchFunctions";
import { SingleCoin } from "../../../context/types";
import { getCurrencySymbol } from "../../../lib/getCurrencySymbol";
import { formatNumber } from "../../../lib/formatNumber";

const TitleWrapper = styled("div")({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
});

const PricesWrapper = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

const Coin = () => {
  const params = useParams();
  const id = params.id as string;
  const searchParams = useSearchParams();
  const currency = searchParams.get("currency") || "usd";

  const { data: coin, isLoading } = useQuery<SingleCoin>({
    queryKey: ["single-coin", { id, currency }],
    queryFn: () => fetchSingleCoin(id, currency),
    ...configForUseQuery,
  });

  if (!coin) return;

  return (
    <Box
      sx={{
        mt: "1rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TitleWrapper>
        <Image
          src={coin?.image.small}
          alt={coin?.name}
          width="50"
          height="50"
        />
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          {coin?.name}
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: "bold", ml: "0.5rem" }}>
          ({coin?.symbol})
        </Typography>
      </TitleWrapper>
      <PricesWrapper sx={{ mt: "1rem", mb: "1rem" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Current Price: {getCurrencySymbol(currency)}
          {formatNumber(coin?.market_data.current_price[currency], 2)}
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Market Cap: {getCurrencySymbol(currency)}
          {formatNumber(coin?.market_data.market_cap[currency])}
        </Typography>
        <Typography variant="subtitle1">
          Rank: {coin?.market_cap_rank}
        </Typography>
        {/* {user && (
            <Button
              variant="outlined"
              sx={{
                width: "100%",
                height: 40,
                color: "black",
                backgroundColor: inWatchlist ? "#aa0000" : "#EEBC1D",
              }}
              onClick={inWatchlist ? removeFromWatchlist : addToWatchlist}
            >
              {inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
            </Button>
          )} */}
      </PricesWrapper>

      <CoinChart id={id} currency={currency} />
    </Box>
  );
};

export default Coin;

// const inWatchlist = watchlist?.includes(coin?.id);

// const addToWatchlist = async () => {
//   if (user) {
//     console.log("click");

//     const coinRef = doc(db, "watchlist", user.uid);

//     try {
//       await setDoc(coinRef, {
//         coins: watchlist ? [...watchlist, coin?.id] : [coin?.id],
//       });

//       setAlert({
//         open: true,
//         message: `${coin.name} Added to the Watchlist`,
//         type: "success",
//       });
//     } catch (error: any) {
//       setAlert({
//         open: true,
//         message: error.message,
//         type: "error",
//       });
//     }
//   }
// };

// const removeFromWatchlist = async () => {
//   if (user) {
//     console.log("click");

//     const coinRef = doc(db, "watchlist", user.uid);

//     try {
//       await setDoc(
//         coinRef,
//         {
//           coins: watchlist.filter((watch) => watch !== coin?.id),
//         },
//         { merge: true }
//       );

//       setAlert({
//         open: true,
//         message: `${coin.name} Removed from the Watchlist`,
//         type: "success",
//       });
//     } catch (error: any) {
//       setAlert({
//         open: true,
//         message: error.message,
//         type: "error",
//       });
//     }
//   }
// };
