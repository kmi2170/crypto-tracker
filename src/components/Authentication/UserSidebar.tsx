import * as React from "react";
// import Box from '@mui/material/Box';
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { AiFillDelete } from "react-icons/ai/index";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { CryptoState } from "../../context/CryptoContext";
import { numberWithComma } from "../Banner/Carousel-old";
import { auth, db } from "../../lib/firebase";
import { configForUseQuery } from "../../lib/fetchFunctions";
import { Coin } from "../../context/types";

type Anchor = "right";

const fetchFn = async (currency: string) => {
  const { data } = await axios.get(`/api/coin-list?currency=${currency}`);
  return data;
};

export default function UserSidebar() {
  const [state, setState] = React.useState({
    right: false,
  });

  const { user, setAlert, watchlist, symbol, currency } = CryptoState();

  const { data: coins } = useQuery<Coin[]>({
    queryKey: ["coins", currency],
    queryFn: () => fetchFn(currency),
    ...configForUseQuery,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const logOut = () => {
    signOut(auth);

    setAlert({
      open: true,
      type: "success",
      message: "Logout Successful!",
    });

    toggleDrawer("right", false);
  };

  const removeFromWatchlist = async (coin: Coin) => {
    if (user) {
      const coinRef = doc(db, "watchlist", user.uid);

      try {
        await setDoc(
          coinRef,
          {
            coins: watchlist.filter((watch) => watch !== coin?.id),
          },
          { merge: true }
        );

        setAlert({
          open: true,
          message: `${coin.name} Removed from the Watchlist`,
          type: "success",
        });
      } catch (error: any) {
        setAlert({
          open: true,
          message: error.message,
          type: "error",
        });
      }
    }
  };

  return (
    <>
      {(["right"] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <Avatar
            onClick={toggleDrawer(anchor, true)}
            sx={{
              height: 38,
              width: 38,
              cursor: "pointer",
              backgroundColor: "#EEBC1D",
            }}
            src={user?.photoURL || ""}
            alt={user?.displayName || user?.email || "userName"}
          />
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <Box
              sx={{
                width: 350,
                padding: 3,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                fontFamily: "monospace",
              }}
            >
              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "20px",
                  height: "92%",
                }}
              >
                <Avatar
                  sx={{
                    height: 200,
                    width: 200,
                    cursor: "pointer",
                    backgroundColor: "#EEBC1D",
                    objectFit: "contain",
                  }}
                  src={user?.photoURL || ""}
                  alt={user?.displayName || user?.email || "userName"}
                />
                <span
                  style={{
                    width: "100%",
                    fontSize: 25,
                    fontWeight: "bolder",
                    wordWrap: "break-word",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  {user?.displayName || user?.email}
                </span>
                <Box
                  sx={{
                    flex: 1,
                    width: "100%",
                    backgroundColor: "grey",
                    borderRadius: 10,
                    p: 2,
                    pt: 1,
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 12,
                    overflowY: "scroll",
                  }}
                >
                  <span style={{ fontSize: 15, textShadow: "0 0 5p black" }}>
                    Watchlist
                  </span>

                  {coins?.map((coin: Coin) => {
                    if (watchlist.includes(coin.id)) {
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
                            {symbol}
                            {numberWithComma(+coin.current_price.toFixed(2))}
                            <AiFillDelete
                              style={{ cursor: "pointer" }}
                              onClick={() => removeFromWatchlist(coin)}
                            />
                          </span>
                        </div>
                      );
                    }
                  })}
                </Box>
              </Box>
              <Button
                variant="contained"
                onClick={logOut}
                sx={{
                  height: "8%",
                  width: "100%",
                  backgroundColor: "#EEBC1D",
                  mt: 3,
                }}
                fullWidth
              >
                Log Out
              </Button>
            </Box>
          </Drawer>
        </React.Fragment>
      ))}
    </>
  );
}
