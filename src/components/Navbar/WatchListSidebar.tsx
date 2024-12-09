import { useState } from "react";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { AiFillDelete } from "react-icons/ai/index";

import { Coin } from "../../context/types";
import useLocalStorage from "../../hooks/useLocalStorage";

export default function WatchListSidebar() {
  // const removeFromWatchlist = async (coin: Coin) => {
  //   if (user) {
  //     const coinRef = doc(db, "watchlist", user.uid);

  //     try {
  //       await setDoc(
  //         coinRef,
  //         {
  //           coins: watchlist.filter((watch) => watch !== coin?.id),
  //         },
  //         { merge: true }
  //       );

  //       setAlert({
  //         open: true,
  //         message: `${coin.name} Removed from the Watchlist`,
  //         type: "success",
  //       });
  //     } catch (error: any) {
  //       setAlert({
  //         open: true,
  //         message: error.message,
  //         type: "error",
  //       });
  //     }
  //   }
  // };

  const [open, setOpen] = useState(false);

  const { value: watchList, setValueToLocalStorage } = useLocalStorage(
    "crypto-tracker-watch-list",
    []
  );

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
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
              width: "100%",
              backgroundColor: "white",
              borderRadius: "10px",
              flexDirection: "column",
              alignItems: "center",
              // gap: 12,
              overflowY: "scroll",
            }}
          >
            {[]?.map((coin: Coin) => {
              if ([].length) {
                return (
                  <div
                    key={coin.name}
                    style={{
                      padding: 10,
                      borderRadius: 5,
                      color: "black",
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      backgroundColor: "#EEBC1D",
                      boxShadow: "0 0 3px black",
                    }}
                  >
                    <span>{coin.name}</span>
                    <span style={{ display: "flex", gap: 8 }}>
                      {/* {symbol} */}
                      {/* {numberWithComma(+coin.current_price.toFixed(2))} */}
                      <AiFillDelete
                        style={{ cursor: "pointer" }}
                        // onClick={() => removeFromWatchlist(coin)}
                      />
                    </span>
                  </div>
                );
              }
            })}
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
