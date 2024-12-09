import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import useLocalStorage from "../../hooks/useLocalStorage";

const initStorage = "";

const SelectCurrency = () => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const { value: storedCurrency, setValueToLocalStorage } = useLocalStorage(
    "crypto-tracker-currency",
    initStorage
  );

  const currency = storedCurrency || searchParams.get("currency") || "usd";

  const handleChange = (e: SelectChangeEvent) => {
    const params = new URLSearchParams(searchParams);
    const newCurrency = e.target.value;
    params.set("currency", newCurrency);
    const newUrl = `${pathName}?${params.toString()}`;
    setValueToLocalStorage("currency", newCurrency);
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
