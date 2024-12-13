import { useContext } from "react";
import { CurrencyContext, CurrencyContextType } from ".";

export const useCurrency = () => {
  return useContext<CurrencyContextType>(CurrencyContext);
};
