"use client";

import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import { useEffect } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useCurrency } from "../../context/hook";
import { Currencies } from "../../api/types";

const key = process.env.NEXT_PUBLIC_LOCAL_STORAGE_CURRENCY_KEY as string;

const SelectCurrency = () => {
  const { currency, setCurrency } = useCurrency();

  const { getItemFromLocalStorage, setItemToLocalStorage } = useLocalStorage(
    key,
    "" as Currencies
  );

  useEffect(() => {
    const storedValue = getItemFromLocalStorage();
    if (storedValue) {
      setCurrency(storedValue || "usd");
    }
  }, []);

  const handleChange = (e: SelectChangeEvent) => {
    const newCurrency = e.target.value as Currencies;
    setCurrency(newCurrency);
    setItemToLocalStorage(newCurrency);
  };

  return (
    <Select
      variant="outlined"
      sx={{ width: 100, height: 40, backgroundColor: "white" }}
      value={currency}
      onChange={handleChange}
      aria-label="select currency"
    >
      <MenuItem value="usd">USD</MenuItem>
      <MenuItem value="eur">EUR</MenuItem>
      <MenuItem value="jpy">JPY</MenuItem>
    </Select>
  );
};

export default SelectCurrency;
