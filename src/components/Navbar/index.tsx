"use client";

import Link from "next/link";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

import SelectCurrency from "./SelectCurrency";

const Wrapper = styled(Container)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
});

const Title = styled(Typography)({
  "& a": {
    color: "gold",
    fontWeight: "bold",
    cursor: "pointer",
  },
});

const Navbar = () => {
  return (
    <AppBar position="sticky" sx={{ backgroundColor: "rgba(0,65,106,0.8)" }}>
      <Toolbar>
        <Wrapper maxWidth="lg">
          <Title variant="h5">
            <Link href="/">Crypto Tracker</Link>
          </Title>
          <SelectCurrency />
          {/* {user ? <UserSidebar /> : <AuthModal />} */}
        </Wrapper>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
