import Link from "next/link";
import AppBar from "@mui/material/AppBar"
import Container from "@mui/material/Container"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

import { CryptoState } from "../context/CryptoContext";
import AuthModal from "./Authentication/AuthModal";
import UserSidebar from "./Authentication/UserSidebar";

const useStyles = makeStyles(() => ({
  bannerContent: {
    height: 400,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    paddingTop: 25,
  }
}))

const Header = () => {
  const classes = useStyles()

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  const { currency, setCurrency, user } = CryptoState()

  const handleChange = (e: SelectChangeEvent) => setCurrency(e.target.value as string)

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        {/* <Container className={classes.bannerContent}> */}
        <Container sx={{
          // height: 400,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          paddingTop: 2,
        }}>
          <Toolbar>
            {/* <Typography className={classes.title} variant="h6"> */}
            <Typography style={{
              flex: 1,
              color: "gold",
              fontWeight: "bold",
              cursor: "pointer",
            }}>
              <Link href="/">
                <a>Crypto Tracker</a>
              </Link>
            </Typography>

            <Select
              variant="outlined"
              style={{ width: 100, height: 40, marginRight: 15 }}
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
    </ThemeProvider>
  )
}

export default Header
