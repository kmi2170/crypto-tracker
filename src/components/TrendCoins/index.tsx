"use client";

import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

import Carousel from "./Carousel";

const TrendWrapper = styled(Paper)({
  margin: "auto",
  marginTop: "3rem",
  maxWidth: "1000px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  paddingTop: "1rem",
  paddingBottom: "1rem",
});

const TrendCoins = () => {
  return (
    <TrendWrapper elevation={5}>
      <Typography
        component="h2"
        variant="h4"
        align="center"
        sx={{ fontWeight: "bold", mb: "1.5rem" }}
      >
        Trend
      </Typography>
      <Carousel />
    </TrendWrapper>
  );
};

export default TrendCoins;
