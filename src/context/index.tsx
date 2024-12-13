import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useMemo,
  useState,
} from "react";
import { Currencies } from "../api/types";

export type CurrencyContextType = {
  currency: Currencies;
  setCurrency: Dispatch<SetStateAction<Currencies>>;
};

export const CurrencyContext = createContext<CurrencyContextType>(
  {} as CurrencyContextType
);

export const CurrencyContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [currency, setCurrency] = useState<Currencies>("usd");

  const value = useMemo(
    () => ({
      currency,
      setCurrency,
    }),
    [currency]
  );

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};
