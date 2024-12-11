import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";

const key = process.env.NEXT_PUBLIC_LOCAL_STORAGE_CURRENCY_KEY as string;

const SelectCurrency = () => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const { getItemFromLocalStorage, setItemToLocalStorage } = useLocalStorage(
    key,
    ""
  );

  useEffect(() => {
    const storedValue = getItemFromLocalStorage();
    if (storedValue) {
      const params = new URLSearchParams(searchParams);
      params.set("currency", storedValue);
      const newUrl = `${pathName}?${params.toString()}`;
      router.push(newUrl);
    }
  }, []);

  const currency = searchParams.get("currency") || "usd";

  const handleChange = (e: SelectChangeEvent) => {
    const params = new URLSearchParams(searchParams);
    const newCurrency = e.target.value;
    params.set("currency", newCurrency);
    const newUrl = `${pathName}?${params.toString()}`;
    setItemToLocalStorage(newCurrency);
    router.push(newUrl);
  };

  return (
    <Select
      variant="outlined"
      sx={{ width: 100, height: 40, backgroundColor: "white" }}
      value={currency}
      onChange={handleChange}
    >
      <MenuItem value="usd">USD</MenuItem>
      <MenuItem value="eur">EUR</MenuItem>
      <MenuItem value="jpy">JPY</MenuItem>
    </Select>
  );
};

export default SelectCurrency;
