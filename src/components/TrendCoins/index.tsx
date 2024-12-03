"use client";

import { Suspense } from "react";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

import Carousel from "./Carousel";

const TitleWrapper = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  textAlign: "center",
});

const TrendCoins = () => {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        pt: 5,
      }}
    >
      <TitleWrapper>
        <Typography
          variant="h2"
          component="h1"
          sx={{ fontWeight: "bold", mt: 3 }}
        >
          Crypto Tracker
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: "darkgrey",
            textTransform: "capitalize",
            m: 2,
            mb: 10,
          }}
        >
          Get your favorite crypto currency info
        </Typography>
      </TitleWrapper>
      <Typography variant="h4" align="center" sx={{ mt: 2, mb: 3 }}>
        Trend
      </Typography>
      <Suspense>
        <Carousel />
      </Suspense>
    </Container>
  );
};

export default TrendCoins;
