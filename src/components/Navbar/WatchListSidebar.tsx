import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import useLocalStorage from "../../hooks/useLocalStorage";
import { CloseButton } from "../SearchBar/SearchModalContent/buttons";
import { WatchList } from "../../context/types";

const key = process.env.NEXT_PUBLIC_LOCAL_STORAGE_WATCH_LIST_KEY as string;

const WatchListSidebar = () => {
  const [open, setOpen] = useState(false);
  const [watchList, setWatchList] = useState<WatchList[]>([]);

  const { getItemFromLocalStorage, setItemToLocalStorage } = useLocalStorage(
    key,
    [] as WatchList[]
  );

  const getWatchList = () => {
    const storedValue = getItemFromLocalStorage();
    setWatchList(storedValue);
  };

  useEffect(() => {
    getWatchList();
  }, []);

  useEffect(() => {
    const handleStorage = () => {
      getWatchList();
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const openDrawer = () => {
    setOpen(true);
  };

  const closeDrawer = () => {
    setOpen(false);
  };

  const removeFromWatchList = (_id: string) => {
    const newWatchList = watchList.filter(({ id }) => id !== _id);
    setItemToLocalStorage(newWatchList);
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
        Watch List {watchList?.length}
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
          {/* <Box>
            <CloseButton color="white" onClick={closeDrawer} />
          </Box> */}
          <Box
            sx={{
              flex: 1,
              p: "1rem",
              backgroundColor: "white",
              borderRadius: "10px",
              overflowY: "scroll",
            }}
          >
            {watchList
              ?.sort((a, b) => a.market_cap_rank - b.market_cap_rank)
              .map(({ id, name, imgUrl }) => {
                return (
                  <Box
                    key={id}
                    sx={{
                      mb: "0.5rem",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <Image src={imgUrl} width={30} height={30} alt={name} />
                    <Typography
                      variant="h6"
                      sx={{
                        ml: "0.5rem",
                        flex: 1,
                        fontWeight: "bold",
                      }}
                    >
                      <Link href={`/coins/${id}`}>{name}</Link>
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
                      onClick={() => removeFromWatchList(id)}
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
