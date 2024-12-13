import { useState, useEffect } from "react";

import Button from "@mui/material/Button";

import useLocalStorage from "../../../hooks/useLocalStorage";
import { WatchList } from "../../../api/types";

type AddToAndRemoveFromWatchListProps = {
  id: string;
  name: string;
  imgUrl: string;
  market_cap_rank: number;
};

const key = process.env.NEXT_PUBLIC_LOCAL_STORAGE_WATCH_LIST_KEY as string;

const AddToAndRemoveFromWatchList = (
  props: AddToAndRemoveFromWatchListProps
) => {
  const { id, name, imgUrl, market_cap_rank } = props;
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

  const inWatchList = watchList?.some(({ id: _id }) => id === _id);

  const addToWatchList = (
    id: string,
    name: string,
    imgUrl: string,
    market_cap_rank: number
  ) => {
    const existInList = watchList?.some(({ id: _id }) => id === _id);
    if (existInList) return;
    const newWatchList = [{ id, name, imgUrl, market_cap_rank }, ...watchList];
    setItemToLocalStorage(newWatchList);
  };

  const removeFromWatchList = (_id: string) => {
    const newWatchList = watchList.filter(({ id }) => id !== _id);
    setItemToLocalStorage(newWatchList);
  };

  return (
    <Button
      variant="outlined"
      sx={(theme) => ({
        mb: "0.25rem",
        width: "16rem",
        color: "black",
        fontWeight: "bold",
        border: "none",
        borderRadius: "20px",
        backgroundColor: inWatchList
          ? theme.palette.secondary.light
          : theme.palette.secondary.main,
      })}
      onClick={() =>
        inWatchList
          ? removeFromWatchList(id)
          : addToWatchList(id, name, imgUrl, market_cap_rank)
      }
    >
      {inWatchList ? "Remove from Watch List" : "Add to Watch List"}
    </Button>
  );
};

export default AddToAndRemoveFromWatchList;
