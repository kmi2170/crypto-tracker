"use client";

import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

import Carousel from "./Carousel";

const TrendWrapper = styled(Paper)(({ theme }) => ({
  margin: "auto",
  [theme.breakpoints.down("sm")]: {
    marginTop: "1rem",
  },
  [theme.breakpoints.up("sm")]: {
    marginTop: "3rem",
  },
  [theme.breakpoints.down("md")]: {
    maxWidth: "600px",
  },
  [theme.breakpoints.up("md")]: {
    width: "800px",
  },
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  paddingTop: "0.75rem",
}));

const TrendCoins = () => {
  return (
    <TrendWrapper elevation={5}>
      <Typography
        component="h2"
        variant="h5"
        align="center"
        sx={{ fontWeight: "bold", mb: "1.0rem" }}
      >
        Trend
      </Typography>

      <Carousel />
    </TrendWrapper>
  );
};

export default TrendCoins;
