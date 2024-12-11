import { useState } from "react";
import Link from "next/link";

import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import useLocalStorage from "../../hooks/useLocalStorage";
import { CloseButton } from "../SearchBar/SearchModalContent/buttons";

const WatchListSidebar = () => {
  const [open, setOpen] = useState(false);

  const { value: watchList, setValueToLocalStorage } = useLocalStorage(
    "crypto-tracker-watch-list",
    []
  );

  const openDrawer = () => {
    setOpen(true);
  };

  const closeDrawer = () => {
    setOpen(false);
  };

  const removeFromWatchList = (id: string) => {
    const newWatchList = watchList.filter((_id) => id !== _id);
    setValueToLocalStorage("crypto-tracker-watch-list", newWatchList);
  };

  return (
    <>
      <Button
        onClick={openDrawer}
        sx={{
          height: "40px",
          lineHeight: "1rem",
          fontWeight: "bold",
          backgroundColor: "#EEBC1D",
        }}
        aria-label="watch-list"
      >
        Watch List {watchList.length}
      </Button>
      <Drawer anchor="right" open={open} onClose={closeDrawer}>
        <Box
          sx={{
            width: 350,
            padding: 3,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            fontFamily: "monospace",
            backgroundColor: "rgba(0,65,106,0.8)",
          }}
        >
          <Typography
            variant="h4"
            align="center"
            sx={{ mb: "1rem", color: "gold", fontWeight: "bold" }}
          >
            Watch List
          </Typography>
          <Box>
            <CloseButton color="white" onClick={closeDrawer} />
          </Box>
          <Box
            sx={{
              flex: 1,
              p: "1rem",
              backgroundColor: "white",
              borderRadius: "10px",
              overflowY: "scroll",
            }}
          >
            {watchList.map((coin) => {
              return (
                <Box
                  key={coin}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      mb: "0.75rem",
                      background: "green",
                      flex: 1,
                    }}
                  >
                    <Link href={`/coins/${coin}`}>{coin}</Link>
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{
                      color: "black",
                      fontWeight: "bold",
                      border: "none",
                      borderRadius: "20px",
                      backgroundColor: "pink",
                    }}
                    onClick={() => removeFromWatchList(coin)}
                  >
                    Remove
                  </Button>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default WatchListSidebar;
