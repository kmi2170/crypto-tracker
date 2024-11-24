import Link from "next/link";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { makeStyles } from "@mui/styles";

import { CryptoState } from "../context/CryptoContext";
import AuthModal from "./Authentication/AuthModal";
import UserSidebar from "./Authentication/UserSidebar";

const useStyles = makeStyles(() => ({
  bannerContent: {
    // height: 400,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    paddingTop: 2,
  },
  title: {
    flex: 1,
    color: "gold",
    fontWeight: "bold",
    cursor: "pointer",
  },
}));

const Header = () => {
  const classes = useStyles();

  const { currency, setCurrency, user } = CryptoState();

  const handleChange = (e: SelectChangeEvent) =>
    setCurrency(e.target.value as string);

  return (
    <AppBar color="transparent" position="static">
      <Container className={classes.bannerContent}>
        <Toolbar>
          <Typography className={classes.title} variant="h5">
            <Link href="/">Crypto Tracker</Link>
          </Typography>

          <Select
            variant="outlined"
            sx={{ width: 100, height: 40, mr: 2 }}
            value={currency}
            onChange={handleChange}
          >
            <MenuItem value={"USD"}>USD</MenuItem>
            <MenuItem value={"EUR"}>EUR</MenuItem>
            <MenuItem value={"JPY"}>JPY</MenuItem>
          </Select>

          {user ? <UserSidebar /> : <AuthModal />}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
