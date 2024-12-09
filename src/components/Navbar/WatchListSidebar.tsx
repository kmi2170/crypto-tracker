import { useState } from "react";
import Link from "next/link";

import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import useLocalStorage from "../../hooks/useLocalStorage";

export default function WatchListSidebar() {
  const [open, setOpen] = useState(false);

  const { value: watchList, setValueToLocalStorage } = useLocalStorage(
    "crypto-tracker-watch-list",
    []
  );

  console.log(watchList);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const removeFromWatchList = (id: string) => {
    const newWatchList = watchList.filter((_id) => id !== _id);
    setValueToLocalStorage("crypto-tracker-watch-list", newWatchList);
  };

  return (
    <>
      <Button
        onClick={toggleDrawer(true)}
        sx={{
          height: "40px",
          fontWeight: "bold",
          backgroundColor: "#EEBC1D",
        }}
        aria-label="watch-list"
      >
        Watch List
      </Button>
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
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
            variant="h5"
            align="center"
            gutterBottom
            sx={{ color: "gold", fontWeight: "bold" }}
          >
            Watch List
          </Typography>
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
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    key={coin}
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
}
