import { Suspense } from "react";

import Box from "@mui/material/Box";

import CoinChart from "../../../components/SingleCoin/CoinChart";
import CoinInfo from "../../../components/SingleCoin/CoinInfo";
import LoadingIndicator from "../../../components/LoadingIndicator";

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
      <Suspense
        fallback={
          <Box
            sx={{
              height: "90vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <LoadingIndicator />
          </Box>
        }
      >
        <CoinInfo />
        <CoinChart />
      </Suspense>
    </Box>
  );
};

export default SingleCoin;
