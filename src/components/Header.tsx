"use client";

import Link from "next/link";
import Form from "next/form";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";

import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { colors } from "@mui/material";
import useLocalStorage from "../hooks/useLocalStrage";
// import AuthModal from "./Authentication/AuthModal";
// import UserSidebar from "./Authentication/UserSidebar";

const Wrapper = styled(Container)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  paddingTop: 2,
});

const Title = styled(Typography)({
  flex: 1,
  "& a": {
    color: "gold",
    fontWeight: "bold",
    cursor: "pointer",
  },
});

const Header = () => {
  return (
    <AppBar color="transparent" position="sticky">
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

export default Header;

const initStorage = "";

const SelectCurrency = () => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const { value: storedCurrency, setValueToLocalStorage } = useLocalStorage(
    "currency",
    initStorage
  );

  const currency = storedCurrency || searchParams.get("currency") || "usd";

  const handleChange = (e: SelectChangeEvent) => {
    const params = new URLSearchParams(searchParams);
    const newCurrency = e.target.value;
    params.set("currency", newCurrency);
    const newUrl = `${pathName}?${params.toString()}`;
    setValueToLocalStorage("currency", newCurrency);
    router.push(newUrl);
  };

  return (
    <Select
      variant="outlined"
      sx={{ width: 100, height: 40, mr: 2 }}
      value={currency}
      onChange={handleChange}
    >
      <MenuItem value="usd">USD</MenuItem>
      <MenuItem value="eur">EUR</MenuItem>
      <MenuItem value="jpy">JPY</MenuItem>
    </Select>
  );
};
