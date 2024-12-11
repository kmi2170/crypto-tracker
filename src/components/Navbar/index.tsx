"use client";

import Link from "next/link";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography, { TypographyProps } from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

import SelectCurrency from "./SelectCurrency";
import WatchListSidebar from "./WatchListSidebar";

const Wrapper = styled(Container)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
});

const Title = styled(Typography)<TypographyProps>({
  "& a": {
    color: "gold",
    fontWeight: "bold",
    cursor: "pointer",
  },
});

const CurrencyAndWatchListWrapper = styled("div")<TypographyProps>({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  gap: "1.0rem",
});

const Navbar = () => {
  return (
    <AppBar position="sticky" sx={{ backgroundColor: "rgba(0,65,106,0.8)" }}>
      <Toolbar>
        <Wrapper maxWidth="lg">
          <Title
            variant="h4"
            component="h1"
            sx={(theme) => ({
              [theme.breakpoints.down("sm")]: {
                fontSize: "1.25rem",
              },
            })}
          >
            <Link href="/">Crypto Tracker</Link>
          </Title>
          <CurrencyAndWatchListWrapper>
            <SelectCurrency />
            <WatchListSidebar />
          </CurrencyAndWatchListWrapper>
        </Wrapper>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
