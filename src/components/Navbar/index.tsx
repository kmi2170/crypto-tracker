"use client";

import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography, { TypographyProps } from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

import SelectCurrency from "./SelectCurrency";
import WatchListSidebar from "./WatchListSidebar";
import { memo } from "react";

const Wrapper = styled(Container)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
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
          <Title />
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

const TitleWrapper = styled(Typography)<TypographyProps>({
  "& a": {
    color: "gold",
    fontWeight: "bold",
    cursor: "pointer",
  },
});

const Title = memo(() => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  return (
    <TitleWrapper
      variant="h4"
      component="h1"
      sx={(theme) => ({
        [theme.breakpoints.down("sm")]: {
          fontSize: "1.25rem",
        },
      })}
    >
      <Link href={`/?${params.toString()}`}>Crypto Tracker</Link>
    </TitleWrapper>
  );
});
