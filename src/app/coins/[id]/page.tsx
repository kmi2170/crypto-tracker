import { Suspense } from "react";

import Box from "@mui/material/Box";

import CoinChart from "../../../components/SingleCoin/CoinChart";
import CoinInfo from "../../../components/SingleCoin/CoinInfo";

const SingleCoin = () => {
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
      <Suspense>
        <CoinInfo />
      </Suspense>

      <Suspense>
        <CoinChart />
      </Suspense>
    </Box>
  );
};

export default SingleCoin;
