import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";

import SelectCurrency from "./SelectCurrency";
import WatchListSidebar from "./WatchListSidebar";
import Title from "./Title";

const Navbar = () => {
  return (
    <AppBar position="sticky" sx={{ backgroundColor: "rgba(0,65,106,0.8)" }}>
      <Toolbar>
        <Container
          maxWidth="lg"
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Title />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: "1.0rem",
            }}
          >
            <SelectCurrency />
            <WatchListSidebar />
          </Box>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
